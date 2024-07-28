import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import authroute from './routes/authroute.js'
import employeeroute from './routes/employeeroute.js'

// config
dotenv.config()
//database connection
connectDb()

// rest object
const app  =  express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user',authroute)
app.use('/api/v1/employee',employeeroute)

app.use('/uploads',express.static('uploads'))

app.get('/',(req,res)=>{
    res.send('hello home')
})

const port =  process.env.PORT || 7000
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})
