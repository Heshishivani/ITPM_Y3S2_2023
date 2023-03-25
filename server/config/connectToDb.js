//Load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
    }

//Import mongoose
const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database");
    } catch (err) {
        console.log(err);
    }
}

//Export database connection
module.exports = connectToDb;