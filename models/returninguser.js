var mongoose = require("mongoose");

var returninguser = new mongoose.Schema({
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
        firstName: String,
        lastName: String,
        orderStatus: {
            type: String,
            default: 'Pending'
        }
    }],
});

module.exports = mongoose.model('ReturningUser', returninguser);