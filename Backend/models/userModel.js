import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userModel = mongoose.Schema({


      fname: {
        type: String,
        required: false,
      },
      lname: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
        default: null,
      },

    }, {
        timestamps: true

})

userModel.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userModel.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }

  const Salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, Salt)

})

const User = mongoose.model('users', userModel)
export default User