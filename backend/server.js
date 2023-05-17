const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


//improt routes
const plasticRoutes = require('./routes/sellerroutes');

//app middleware
app.use(bodyParser.json());


//route middleware
app.use(plasticRoutes);


const PORT = 8000;
const DB_URL = 'mongodb+srv://it19169118:dilsha1998@itpmseller.fqidlol.mongodb.net/itpm?retryWrites=true&w=majority'

mongoose.connect(DB_URL)
.then(() =>{
    console.log('DB Connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});






