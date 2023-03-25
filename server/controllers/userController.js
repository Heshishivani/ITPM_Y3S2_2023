const User = require("../models/user");


const createUsers=async (req,res)=>{
    //get sent in data off request body
    const{first_name,last_name, username,email,new_password,confirm_password}=req.body;

    //create user
    const user= await User.create({
        first_name,
        last_name,
        username,
        email,
        new_password,
        confirm_password
    });
    //response with new user
    res.json({user});
};

const fecthUsers= async (req,res)=>{
    //Find users
    const users = await User.find();
    //Response with the users
    res.json({users});
};

const fecthUser= async (req,res)=>{
    //get id off the url
    const userId= req.params.id;
    
    //Find the user useing that id
    const user = await User.findById(userId);
    //Response with the user
    res.json({user});
};

const updateUser= async (req,res)=>{
    //Get id off the url
    const userId= req.params.id;
    //Get the data off the req body
    const{first_name,last_name, username,email,new_password,confirm_password}=req.body;

    //Find and update
    await User.findByIdAndUpdate(userId,{
        first_name,
        last_name,
        username,
        email,
        new_password,
        confirm_password
    });
    //find updated user
    const user = await User.findById(userId);

    //respond with it
    res.json({user:user});
};

const deleteUser= async (req,res)=>{
    //get id off the url
    const userId= req.params.id;
    //delete recoed 
    await User.deleteOne({ _id: userId });
    //respond
    res.json({success:"record deleted"});
};

module.exports={
    createUsers,
    fecthUsers,
    fecthUser,
    updateUser,
    deleteUser,

};