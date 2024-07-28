import mongoose from "mongoose";

const EmployeeSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        enum:['HR','MANAGER','SALES'],
        required:true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    course:{
        type:String,
        enum: ['MCA', 'BCA','BCS'],
        required:true

    },
    avatar:{
        type:String,
        required:true
    },
    time: {
         type: Date, 
         default: Date.now
         },

},{timestamps:true})

const employeeModel =  mongoose.model('Employees',EmployeeSchema)

export default employeeModel;