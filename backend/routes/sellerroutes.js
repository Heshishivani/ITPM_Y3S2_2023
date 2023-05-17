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

//get details
router.get('/plastic',(req,res) =>{
    Sellers.find().exec((err,sellers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingDetails:sellers
        });
    });
});

//update details
router.put('/plastic/update/:id',(req,res)=>{
    Sellers.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,seller)=>{
            if(err){
                return  res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

//delete details
router.delete('/plastic/delete/:id',(req,res) =>{
    Sellers.findByIdAndRemove(req.params.id).exec((err,deletedSeller) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccessfull",err
        });

        return res.json({
            message:"Delete Successfull",deletedSeller
        });
    });
});

module.exports = router;