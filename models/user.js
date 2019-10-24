var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    id: {
        type: String,
        unique: true
    },
    birthDate: Date,
    registerDate: {
        type: Date,
        default: Date.now
    },
    classStanding: String,
    address: String,
    city: String,
    zipCode: String,
    ethnicity: String,
    military: String,
    status: {
        type: String,
        default: "Pending"
    },
    householdNumber: Number,
    members: [{
        firstName: String,
        birthDay: Date,
        race: String
    }]


});

userSchema.plugin(uniqueValidator, {message: "Id is not unique"});
module.exports = mongoose.model("User", userSchema);