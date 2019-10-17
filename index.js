var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user");

const path = require("path");
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const databaseUri = process.env.MONGODB_URI || "mongodb://localhost:27017/uwt_pantry";
mongoose.connect(databaseUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error: " + err.message));


app.post("/users", function(req, res) {
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

app.get("/users/class", function(req, res) {
    User.aggregate([{$group: {_id:"$classStanding", total: {"$sum":1}}}], function(err, classStandings) {
        if (err) {
            console.log(err);
        } else {
            res.send(classStandings);
        }
    });
})

app.get("/users/dates", function(req, res) {
    User.aggregate([{"$group":{"_id":{"$month":"$birthDate"},"total":{"$sum":1}}}, {"$sort":{"_id":1}}], function(err, dateGroups) {
        if (err) {
            console.log(err);
        } else {
            res.send(dateGroups);
        }
    })
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {    
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))})};



app.listen(port, () => console.log("Server has started!"));