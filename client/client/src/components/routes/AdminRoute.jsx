import axios from 'axios'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import { useState } from 'react'

export default function AdminRoute(){
    const [ok, setok] = useState(false)


    const[auth] =  useAuth()
   useEffect(()=>{
    const authcheck = async()=>{
        const {data} =  await axios.get('http://localhost:7000/api/v1/user/admin-auth')
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