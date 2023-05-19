import Item from "../models/itemModel.js";
import asyncHandler from "express-async-handler";

const getItemByID = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    res.json({
      _id: item._id,
      code: item.code,
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      available_sizes: item.available_sizes,
      material: item.material,
      images: item.images,
    });
  } else {
    res
      .status(200)
      .send({ success: false, message: "Item account not found." });
  }
});

const saveItem = asyncHandler(async (req, res) => {
  const item = await Item.create(req.body);
  if (item) {
    res.status(201).json({
      success: true,
      message: "success",
    });
  } else {
    res.status(200).send({ message: "Error.Please Try again" });
  }
});

const updateItem = asyncHandler(async (req, res) => {
  if (req.body && req.params) {
    const query = { _id: req.params.id };
    const update = {
      name: req.body.name,
      code: req.body.code,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      available_sizes: req.body.available_sizes,
      images: req.body.images,
      material: req.body.material,
    };

    await Item.updateOne(query, update)
      .then((result) => {
        res
          .status(200)
          .send({ success: true, message: "Item Updated Successfully!" });
      })
      .catch((error) => {
        res.status(200).send({ success: false, message: error });
      });
  } else {
    res.status(200).send({ success: false, message: "No Data Found" });
  }
});

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({}, { password: 0 });
  res.json(items);
});

const deleteItem = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const data = await Item.deleteOne({ _id: req.params.id });
    res.status(200).send({ success: true, message: "success" });
  } else {
    res.status(200).send({ success: false, message: "failed" });
  }
});

export default {
  getItemByID,
  saveItem,
  getItems,
  deleteItem,
  updateItem,
};
