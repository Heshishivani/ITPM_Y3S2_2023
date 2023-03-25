//Import mongoose
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName: String,
    itemCategory: String,
    itemSizes: String,
    itemPrice: String,
    itemMaterial: String,
    itemDescription: String,
    itemImage: String,
});

const Item = mongoose.model("Item", itemSchema);

//Export Item
module.exports = Item;