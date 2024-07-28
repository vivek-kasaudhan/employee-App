import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../../context/Auth'

const Navbar = () => {

  const[auth,setAuth] =  useAuth()

  const handleLogout = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem('auth')
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <div className="d-flex gap-3">
    <Link to='/'>EmployeeApp</Link>
    <Link to='/'>Employee list</Link>
    </div>
  
   <div className="d-flex gap-3 ">
   {auth.user?
   <>
   <Link to={`/dashboard/${auth.user.role=='admin'?'admin':'user'}`}><button className="btn btn-outline-primary">{auth.user.username}</button></Link>
   <Link to='/login'><button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button></Link>
   </>
   :
   <>
    <Link to='/register'><button className="btn btn-outline-primary">Register</button></Link>
    <Link to='/login'><button className="btn btn-outline-primary">Login</button></Link>
   </>}
   
   </div>
 
  </div>
</nav>

    </div>
  )
}

export default Navbar