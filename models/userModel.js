import mongoose from "mongoose";

const userSchema  =  new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },

},{timestamps:true})


const userModel  =  mongoose.model('Users',userSchema)
 export default userModel