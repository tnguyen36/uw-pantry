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
    orderPost: [{
        cannedCorn: String,
        protein: String,
        rice: String,
        macCheese: String,
        peanutButter: String,
        cannedTomato: String,
        peas: String,
        tomatoSoup: String,
        cannedPears: String,
        mixedFruit: String,
        cereal: String,
        greens: String,
        oatmeal: String,
        cornFlake: String,
        cannedHam: String,
        chickenSoup: String,
        kidneyBean: String,
        driedBeans: String,
        hygieneItems: [{
            type: String
        }],
        pickupDate: Date,
        email: String,
        orderStatus: {
            type: String,
            default: 'Pending'
        }
    }],
    members: [{
        firstName: String,
        birthDay: Date,
        race: String
    }]


});

userSchema.plugin(uniqueValidator, {message: "Id is not unique"});
module.exports = mongoose.model("User", userSchema);