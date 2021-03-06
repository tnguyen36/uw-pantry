var mongoose = require("mongoose");

var inventorySchema = new mongoose.Schema({
    weight: Number,
    operator: String,
    currentWeight: Number,
    name: String,
    postedDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Inventory", inventorySchema);