
import express from 'express'
import { createEmployeectrl, deleteSingleEmployeectrl, getAllEmployeectrl, getSingleEmployeectrl, updateEmployeectrl } from "../controllers/employeectrl.js"
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import multer from 'multer'

const router =  express.Router()


const storage  = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage });

router.post('/create-employee',requireSignIn,isAdmin,upload.single('avatar'),createEmployeectrl)
router.get('/get-employees',requireSignIn,isAdmin,getAllEmployeectrl)

//get single employee
router.get('/get-single-employee/:id',requireSignIn,isAdmin,getSingleEmployeectrl)
router.put('/update-employee/:id',requireSignIn,isAdmin,upload.single('avatar'),updateEmployeectrl)

// to delete single product
router.delete('/delete/:id',requireSignIn,isAdmin,deleteSingleEmployeectrl)



export default router