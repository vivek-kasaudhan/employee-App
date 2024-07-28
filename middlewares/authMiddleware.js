import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'


export const requireSignIn  = (req,res,next)=>{
try {
    const decode  =  JWT.verify(req.headers.authorization,process.env.SECRETKEY)
    req.user = decode
    next()
} catch (error) {
     console.log(error)
}
}

export const isAdmin  = async(req,res,next)=>{
    // const{email} = req.body 
    try {
        const user  = await userModel.findById(req.user._id)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        if(user.role !=='admin'){
            return res.status(401).send({
                success:false,
                message:'unauthorised access'
            })
        }else{
             next()
        }
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:'fail'
        })
    }
}