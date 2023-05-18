const mongoose = require("mongoose");

// connect to DB
mongoose.set("strictQuery", false);

const connectDB = () => {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => {
        console.log("Connect to mongoDB altas");
    }).catch((e) => {
        console.log(e);
    });
}



module.exports = connectDB;