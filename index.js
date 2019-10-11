var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post("/users", function(req, res) {
    console.log(req.body);
   
    res.send(req.body);

});



app.listen(3001, () => console.log("Server has started!"));