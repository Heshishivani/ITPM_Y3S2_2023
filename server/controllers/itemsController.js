const Item = require("../models/item");
//test
const fetchItems = async (req, res) => {
    //Find the items
    const items = await Item.find();

    //Respond with them
    res.json({ items });
};

const fetchItem = async (req, res) => {
    //Det id of the URl
    const itemId = req.params.id;
    
    //Find the item using that id
    const item = await Item.findById(itemId);

    //Respond with the item
    res.json({ item });
};

const createItem = async (req, res) => {
    //Get the sent in data off request body
    const {itemName, itemCategory, itemSizes, itemPrice, itemMaterial, itemDescription, itemImage} = req.body;

    //Create an item with it
    const item = await Item.create({
        itemName,
        itemCategory,
        itemSizes,
        itemPrice,
        itemMaterial,
        itemDescription,
        itemImage,
    });

    //Respond with the new item
    res.json({ item });
};

const updateItem = async (req, res) => {
    //Get the id of the URL
    const itemId = req.params.id;

    //Get the dat of the requested body
    const {itemName, itemCategory, itemSizes, itemPrice, itemMaterial, itemDescription, itemImage} = req.body;

    //Update the record
    await Item.findByIdAndUpdate(itemId, {
        itemName,
        itemCategory,
        itemSizes,
        itemPrice,
        itemMaterial,
        itemDescription,
        itemImage,
    });

    //Find updated item
    const item = await Item.findById(itemId);

    //Respond with it
    res.json({ item });
};

const deleteItem = async (req, res) => {
    //get id of the URL
    const itemId = req.params.id;

    //Delete the record
    await Item.deleteOne ({ _id: itemId });

    //Respond with it
    res.json({ success: "Item deleted" });
};

//Export all functions by creating an object
module.exports = {
    fetchItems,
    fetchItem,
    createItem,
    updateItem,
    deleteItem,
};