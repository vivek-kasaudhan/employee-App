import mongoose from "mongoose";


const connectDb =  async()=>{
try {
    const conn  = await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log('connection successfull')
} catch (error) {
    console.log(`connection is unsuccessfull showing ${error.message}`)
}

}
export default connectDb