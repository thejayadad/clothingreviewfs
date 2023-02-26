const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClothingSchema = new Schema({
    title: String,
    price: String,
    description: String,
    type: String
});

module.exports = mongoose.model("Clothing", ClothingSchema);

