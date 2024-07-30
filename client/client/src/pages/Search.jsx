import React from 'react'
import { useSearch } from '../context/Search'
import Layout from '../components/layout/Layout'

const Search = () => {
    const[values,setvalues] = useSearch()
  return (
    <Layout>
      <div className="container">

             <div className='text-center'>
                <h1> Search Results</h1>
                <h6>{values?.results.length < 1 ? 'no products found':`found${values?.results.length}`}</h6>
             </div>
      </div>
    </Layout>
  )
}

export default Search