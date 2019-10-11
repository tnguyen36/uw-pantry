var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {    
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))})};

app.post("/users", function(req, res) {
    console.log(req.body);
   
    res.send(req.body);

});


app.listen(port, () => console.log("Server has started!"));