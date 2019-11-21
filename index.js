var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user");
var Inventory = require("./models/inventory");
var Admin = require("./models/admin");
var moment = require("moment");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var http = require("http").Server(app);
var socketIO = require("socket.io");
var cors = require('cors');

const path = require("path");
const port = process.env.PORT || 3001;

const io = socketIO(http);

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const databaseUri = process.env.MONGODB_URI || "mongodb://localhost:27017/uwt_pantry";
mongoose.connect(databaseUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error: " + err.message));

io.on("connection", socket => {
    console.log("New client connected " + socket.id);
    socket.on("newUser", () => {
        io.sockets.emit("change_data");
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


app.post("/login", function(req, res) {
   Admin.find({username: req.body.username}, function(err, admin) {
       if (err || admin.length === 0) {
           res.send(false);
       } else {           
          bcrypt.compare(req.body.password, admin[0].password, function(err, result) {
              Admin.updateMany({}, {$set: { "loginExpire": moment().add(2, "hours")}}, function(err) {
                  if (err) {
                      console.log(err)
                  } else {
                    var token = jwt.sign({username: admin[0].username}, 'rusty', { expiresIn: '2h'});                  
                    res.send({token, result});
                  }
              })              
           });        
       }
   });

});

app.get("/admin", function(req, res) {
    Admin.find({}, function(err, admin) {
        if (err) {
            console.log(err)
        } else {
            res.send(admin[0].loginExpire)
        }
    })
});

app.post("/token", function(req, res) {
    jwt.verify(req.body.token, 'rusty', function(err, decoded) {
        if (err) {
            res.send(false)
        } else {
            decoded.username === 'pantry@uw.edu' ? res.send(true) : res.send(false);
        }
    });
});

app.post("/users", function(req, res) {
    req.body.firstName = req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1);
    req.body.lastName = req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1);
    User.create(req.body, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    })
});

app.get("/users", function(req, res) {   
        User.find({}, function(err, users) {
            if (err) {
                console.log(err);
            } else {
                res.send(users);
            }
        })   
});

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;


app.post("/users/class", function(req, res) {
    const start = moment(req.body.startDate).toDate();
    const end = moment(req.body.endDate).toDate();

    if (req.body.startDate || req.body.endDate) {
        User.aggregate([{"$match": {"registerDate":{"$gte": start, "$lte": end}}}, {"$group":{"_id":"$classStanding", "total":{"$sum":1}}}], function(err, classStandings) {
            if (err) {
                console.log(err)
            } else {
                res.send(classStandings);
            }
        });
    } else {    
        User.aggregate([{"$group":{"_id":"$classStanding", "total":{"$sum":1}}}], function(err, classStandings) {
            if (err) {
                console.log(err);
            } else {
                res.send(classStandings);
            }
        });
    }
});

app.post("/users/ethnicity", function(req, res) {
    const start = moment(req.body.startDate).toDate();
    const end = moment(req.body.endDate).toDate();
    if (req.body.startDate || req.body.endDate) {
        User.aggregate([{"$match": {"registerDate":{"$gte": start, "$lte": end}}}, {"$group":{"_id":"$ethnicity", "total":{"$sum":1}}}], function(err, ethnicities) {
            if (err) {
                console.log(err)
            } else {
                res.send(ethnicities);
            }
        });
    } else {   
        User.aggregate([{"$group":{"_id":"$ethnicity", "total":{"$sum":1}}}], function(err, ethnicities) {
            if (err) {
                console.log(err);
            } else {
                res.send(ethnicities);
            }
        });
    }
})

app.get("/users/dates", function(req, res) {
    User.aggregate([{$project:{"month":{$month:"$registerDate"}, "year":{$year: "$registerDate"}}},
                    {$match: {"year": year}}, {$group:{"_id":"$month", "total":{$sum: 1}}},
                    {$project:{"_id":1, "total": 1}}], function(err, dateGroups) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send(dateGroups);
                        }
                    });
});

app.get("/users/daily", function(req, res) {
    User.find({registerDate: {$gt: moment().startOf("day"), $lt: moment().endOf("day")}}, function(err, dailyUsers) {
        if (err) {
            console.log(err);
        } else {
            res.send(dailyUsers)
        }
        
    });
});

app.post("/users/transfer", function (req, res) {
   User.updateMany({_id: {$in: req.body}}, {$set: {"status" : "Completed"}}, function (err) {
       if (err) {
           console.log(err);
       } else {
           User.find({}, function(err, users) {
               if (err) {
                   console.log(err);
               } else {
                   res.send(users)
               }
           });
       }
   });   
});

app.post("/inventory", function (req, res) {
    req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    Inventory.create(req.body, function (err, post) {
        if (err) {
            console.log(err)
        } else {
            res.send(post);
        }
        
    });
    
});

app.get("/inventory", function (req, res) {
    Inventory.find({}, function (err, posts) {
        if (err) {
            console.log(err)
        } else {
            res.send(posts)
        }
        
    }).sort({'postedDate': 1});
    
});

app.post("/inventory/delete", function(req, res) {
    Inventory.deleteMany({_id: {$in: req.body}}, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.send("Success")
        }       
    })    
});

app.get("/inventory/daily/positive", function (req, res) {
    const start = moment(req.query.startDate, 'YYYY-MM-DDTHH:mm:ssZ').toDate();
    const end = moment(req.query.endDate, 'YYYY-MM-DDTHH:mm:ssZ').toDate();
    if (req.query.startDate || req.query.endDate) {
        Inventory.aggregate([{$addFields: {created_date:{$dateToParts: {date: "$postedDate", timezone: '-0700'}}}},
                            {$match: {"postedDate":{"$gte": start, "$lte": end}, "operator": "+"}},
                            {$group: {_id: {day: "$created_date.day", month: "$created_date.month", year: "$created_date.year"}, sum: {$sum:"$weight"}}},
                            {$project:{_id: 0, sum: 1, day: "$_id.day", date: { $concat: [ { $toString: "$_id.month" }, "/", { $toString: "$_id.day" }, "/", { $toString: "$_id.year" }  ] }}}
        ],  function(err, posts) {
                if (err) {
                    console.log(err)
                } else {
                    res.send(posts)
                }
            })
    } else {

    Inventory.aggregate([{$project:{"weight": 1, "operator":1, "day":{$dayOfMonth:{date:"$postedDate", timezone: '-0700'}}, "month":{$month:{date:"$postedDate", timezone: '-0700'}}, "year":{$year: "$postedDate"}}},
                        {$match: {"month": month, "operator": "+", "year": year}}, {$group:{"_id":"$day","sum":{$sum:"$weight"},"day":{$first:"$day"}}},
                        {$project:{"_id":0, "sum":1, "day":1}}
    ], function (err, posts) {
        if(err) {
            console.log(err);
        } else {
            res.send(posts)
        }
    });
    }
});

app.get("/inventory/daily/negative", function(req, res) {
    const start = moment(req.query.startDate, 'YYYY-MM-DDTHH:mm:ssZ').toDate();
    const end = moment(req.query.endDate, 'YYYY-MM-DDTHH:mm:ssZ').toDate();
    if (req.query.startDate || req.query.endDate) {
        Inventory.aggregate([{$addFields: {created_date:{$dateToParts: {date: "$postedDate", timezone: '-0700'}}}},
                            {$match: {"postedDate":{"$gte": start, "$lte": end}, "operator": "-"}},
                            {$group: {_id: {day: "$created_date.day", month: "$created_date.month", year: "$created_date.year"}, sum: {$sum:"$weight"}}},
                            {$project:{_id: 0, sum: 1, day: "$_id.day", date: { $concat: [ { $toString: "$_id.month" }, "/", { $toString: "$_id.day" }, "/", { $toString: "$_id.year" }  ] }}}
        ],  function(err, posts) {
                if (err) {
                    console.log(err)
                } else {
                    res.send(posts)
                }
            })
    } else {

    Inventory.aggregate([{$project:{"weight": 1, "operator":1, "day":{$dayOfMonth:{date:"$postedDate",timezone: "-0700"}}, "month":{$month:{date:"$postedDate", timezone: '-0700'}}, "year":{$year: "$postedDate"}}},
                        {$match: {"month": month, "operator": "-", "year": year}}, {$group:{"_id":"$day","sum":{$sum:"$weight"},"day":{$first:"$day"}}},
                        {$project:{"_id":0, "sum":1, "day":1}}
    ], function (err, posts) {
        if(err) {
            console.log(err);
        } else {
            res.send(posts)
        }
    });
}
});





if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {    
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))})};



http.listen(port, () => console.log("Server has started!"));