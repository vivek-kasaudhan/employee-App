
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import About from './pages/about/About'
import PrivateRoute from './components/routes/PrivateRoute'
import UserDashboard from './components/user/UserDashboard'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './components/admin/AdminDashboard'
import CreateEmployee from './components/admin/CreateEmployee'
import UpdateEmployee from './components/admin/UpdateEmployee'
import EmployeeList from './components/admin/EmployeeList'
import AllEmployees from './components/admin/AllEmployees'

import Search from './pages/Search'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element ={<PrivateRoute/>}>
           <Route path='user'element = {<UserDashboard/>}/>
        </Route>
        <Route path='/dashboard' element ={<AdminRoute/>}>
           <Route path='admin'element = {<AdminDashboard/>}/>
           <Route path='admin/create-employee'element ={<CreateEmployee/>}/>
           <Route path='admin/update-employee/:id'element ={<UpdateEmployee/>}/>
           <Route path='admin/get-all-employee' element={<AllEmployees/>}/>
           <Route path='admin/employees'element ={<EmployeeList/>}/>
           <Route path='admin/search'element = {<Search/>}/>
        </Route>
        <Route path='/search'element = {<Search/>}/>

      </Routes>
    </>
  )
}

export default App
