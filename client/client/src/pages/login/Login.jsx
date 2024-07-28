import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import { useAuth } from '../../context/Auth'

const Login = () => {
   const[auth,setauth] =  useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate  =  useNavigate()
  const location  =  useLocation()


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
    const {data} =  await axios.post('http://localhost:7000/api/v1/user/login',
      {
        username,
        password
      }
    )
    if(data && data.success){
    setauth({
      ...auth,
      user:data.user,
      token:data.token
    })
     localStorage.setItem('auth',JSON.stringify(data))
     navigate(location.state || '/')
    }else{
      alert('error in login')
    }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Layout>
      <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' required autoFocus />
        </div>
        <div className="mb-3">
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' required autoFocus />
        </div>
        <button type='submit' className='btn btn-primary'>Login</button>
      </form>
      </div>
    </Layout>
  )
}

export default Login