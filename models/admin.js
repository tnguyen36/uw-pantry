var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    loginExpire: Date,
    accessCode: String
})

module.exports = mongoose.model("Admin", adminSchema);