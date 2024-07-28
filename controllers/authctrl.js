import { comparePass, hashed } from '../helper/helper.js'
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'



export const registerController = async(req,res)=>{
    try {
        const {username,email,password} =  req.body
        if(!username){
            res.send('username is required')
        }
        if(!email){
            res.send('email is required')
        }
        if(!password){
            res.send('password is required')
        }
        const existingUser  =  await userModel.findOne({email})
        if(existingUser){
           return res.send('user is already exists')
        }

        const hashedPassword = await hashed(password)
        const user  = await new userModel({username,email,password:hashedPassword}).save()

        res.status(200).send({
            success:true,
            message:'register successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in registration',
            error:error.message
        })
    }
}
export const loginController  = async(req,res)=>{
try {
    const {username,password} = req.body

    //validation
    if(!password || !username){
        res.send(' username and password is required')
    }

    const user  = await userModel.findOne({username})

    if(!user){
        return res.send('user does not exists')
    }

    const isMatch  = await comparePass(password,user.password)

    if(isMatch == false){
        return res.send('password is incorrect')
    }
    const token  = await JWT.sign({_id:user._id},process.env.SECRETKEY,{expiresIn:'2d'})

    res.status(201).send({
        success:true,
        message:'login successfully',
        user:{
            username:user.username,
            email:user.email,
            role:user.role
        },
        token

    })
    
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in logincontroller',
        error
    })
    
}
}