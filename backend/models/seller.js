const mongoose = require('mongoose');

const sellerschema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    mobile:{
        type:String,
        required:true
    },

    weight:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('plastic',sellerschema);