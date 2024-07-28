import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        <main style={{height:'85vh'}}>{children}</main>
        <Footer/>
    </div>
  )
}

export default Layout