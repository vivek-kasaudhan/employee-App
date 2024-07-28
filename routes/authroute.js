import express from 'express'
import { loginController, registerController } from '../controllers/authctrl.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

const router  = express.Router()


router.post('/register',registerController)

router.post('/login',loginController)



router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})



export default router