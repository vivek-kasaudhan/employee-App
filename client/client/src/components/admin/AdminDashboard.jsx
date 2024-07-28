import React from 'react'
import Layout from '../layout/Layout'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <Layout>
        <h1 className='text-center'>Welcome to admin panel</h1>
        <div className="emp-links d-flex gap-2 mt-5">
            <Link to='/dashboard/admin/create-employee' ><button className='btn btn-primary'>CreateEmployee</button></Link>
            
            <Link to='/dashboard/admin/get-all-employee' ><button className='btn btn-primary'>AllEmployee</button></Link>
        </div>
    </Layout>
  )
}

export default AdminDashboard