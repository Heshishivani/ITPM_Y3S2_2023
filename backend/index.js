const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/DataBase");
const productRoutes = require("./routes/productRoutes");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use("/api/products", productRoutes);

connectDB();

// Schema
const deliverySchema = new mongoose.Schema({
    address: String,
    contact: String
  });
  
  // Model
  const Delivery = mongoose.model('Delivery', deliverySchema);
  
  // Routes
  app.get('/api/deliverys', async (req, res) => {
    try {
      const deliverys = await Delivery.find();
      res.json(deliverys);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.post('/api/deliverys', async (req, res) => {
    const delivery = new Delivery(req.body);
    try {
      await delivery.save();
      res.status(201).json(delivery);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});