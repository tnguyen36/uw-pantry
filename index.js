var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "client", "build")))


app.post("/users", function(req, res) {
    console.log(req.body);
   
    res.send(req.body);

});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(process.env.PORT, () => console.log("Server has started!"));