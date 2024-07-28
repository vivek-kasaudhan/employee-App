import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/Auth'

export default function PrivateRoute(){
    const [ok, setok] = useState(false)

    const[auth] =  useAuth()
   useEffect(()=>{
    const authcheck = async()=>{
        const {data} =  await axios.get('http://localhost:7000/api/v1/user/user-auth')
        if(data.ok){
         setok(true)
        }else{
         setok(false)
        }
    }
    if(auth?.token) authcheck()

   },[auth.token])


    return ok?<Outlet/> :'loading...'
}