const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name:String,
    username: {
        type:String,
        required:[true,"enter a unique Username"],
    },
    email:  {
        type:String,
        required:[true,"enter a unique email"],
    },
    new_password: {
        type:String,
        required:[true,"enter a password"],
    },
    confirm_password: String
});

const User = mongoose.model("User",userSchema);

module.exports= User;