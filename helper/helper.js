import bcrypt from 'bcrypt'

const hashed  = async(password)=>{
try {
   const hashedPassword  =  bcrypt.hash(password,10) 
   return hashedPassword
} catch (error) {
    console.log(error)
}
}

const comparePass  =  async(newpassword,password)=>{
    return bcrypt.compare(newpassword,password)
}
export {hashed,comparePass}