var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user");
var Inventory = require("./models/inventory");
var moment = require("moment");
const path = require("path");
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const databaseUri = process.env.MONGODB_URI || "mongodb://localhost:27017/uwt_pantry";
mongoose.connect(databaseUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error: " + err.message));


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
const winterStart = moment("0101" + year, "MMDDYYYY"); 
const winterEnd = winterStart.clone().add(89, 'days');
const springStart = winterEnd.clone().add(1, 'days');
const springEnd = springStart.clone().add(91, 'days');
const summerStart = springEnd.clone().add(1, 'days');
const summerEnd = summerStart.clone().add(90, 'days');
const fallStart = summerEnd.clone().add(1, 'days');
const fallEnd = fallStart.clone().add(92, 'days');

const quarter = [
        {
            start: fallStart.toDate(),
            end: fallEnd.toDate()
        },
       {
            start: winterStart.toDate(),
            end: winterEnd.toDate()
        },
       {
            start: springStart.toDate(),
            end: springEnd.toDate()
        },
         {
            start: summerStart.toDate(),
            end: summerEnd.toDate()
        }
    ]

app.post("/users/class", function(req, res) {
    
    User.aggregate([{"$match": {"registerDate":{"$gte": quarter[req.body.quarter].start, "$lte": quarter[req.body.quarter].end}}},{"$group":{"_id":"$classStanding", "total":{"$sum":1}}}], function(err, classStandings) {
        if (err) {
            console.log(err);
        } else {
            res.send(classStandings);
        }
    });
})

app.post("/users/ethnicity", function(req, res) {
    User.aggregate([{"$match": {"registerDate":{"$gte": quarter[req.body.quarter].start, "$lte": quarter[req.body.quarter].end}}},{"$group":{"_id":"$ethnicity", "total":{"$sum":1}}}], function(err, ethnicities) {
        if (err) {
            console.log(err);
        } else {
            res.send(ethnicities);
        }
    });
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
        
    });
    
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
    Inventory.aggregate([{$project:{"weight": 1, "operator":1, "day":{$dayOfMonth:{date:"$postedDate",timezone: "-0700"}}, "month":{$month: "$postedDate"}, "year":{$year: "$postedDate"}}},
                        {$match: {"month": month, "operator": "+", "year": year}}, {$group:{"_id":"$day","sum":{$sum:"$weight"},"day":{$first:"$day"}}},
                        {$project:{"_id":0, "sum":1, "day":1}}
    ], function (err, posts) {
        if(err) {
            console.log(err);
        } else {
            res.send(posts)
        }
    });
   
    
});

app.get("/inventory/daily/negative", function(req, res) {
    Inventory.aggregate([{$project:{"weight": 1, "operator":1, "day":{$dayOfMonth:{date:"$postedDate",timezone: "-0700"}}, "month":{$month: "$postedDate"}, "year":{$year: "$postedDate"}}},
                        {$match: {"month": month, "operator": "-", "year": year}}, {$group:{"_id":"$day","sum":{$sum:"$weight"},"day":{$first:"$day"}}},
                        {$project:{"_id":0, "sum":1, "day":1}}
    ], function (err, posts) {
        if(err) {
            console.log(err);
        } else {
            res.send(posts)
        }
    });
})



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {    
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))})};



app.listen(port, () => console.log("Server has started!"));