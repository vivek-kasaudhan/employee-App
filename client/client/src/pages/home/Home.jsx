import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/Auth'

const Home = () => {
  const[auth,setauth] = useAuth()
  return (
    <Layout>
      Home
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default Home