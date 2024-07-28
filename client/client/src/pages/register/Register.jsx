import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate  = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
    const {data} =  await axios.post('http://localhost:7000/api/v1/user/register',
      {
        username,
        email,
        password
      }
    )
    if(data && data.success){
      console.log(data)
     alert('user registered succcessfully')
     navigate('/login')
    }else{
      alert('error in regus')
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
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required autoFocus />
        </div>
        <div className="mb-3">
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' required autoFocus />
        </div>
        <button type='submit' className='btn btn-primary'>Register</button>
      </form>
      </div>
    </Layout>
  )
}

export default Register