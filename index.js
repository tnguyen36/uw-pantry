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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {    
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))})};

app.post("/users", function(req, res) {
    User.create(req.body, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.send(req.body);
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
})


app.listen(port, () => console.log("Server has started!"));