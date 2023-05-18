const dotenv = require("dotenv");
dotenv.config();

const productData = require("./data/products");
const connectDB = require("./config/DataBase");
const Product = require("./models/product-model");

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(productData);
        console.log("Data import success");

        process.exit();
    } catch(err){
        console.error("Error with data import");
        process.exit(1);
    }
};

importData();