const express = require('express');
const Sellers = require('../models/seller');
const seller = require('../models/seller');

const router = express.Router();

// save details
router.post('/plastic/save',(req,res)=>{
    let newSeller = new Sellers(req.body);
    
    newSeller.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Plastic Details Saved Successfully"
        });
    });
});




module.exports = router;