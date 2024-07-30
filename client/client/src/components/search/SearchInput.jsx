import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../context/Search'
import axios from 'axios'




const SearchInput = () => {

    const[values,setvalues] = useSearch()
    const navigate  =  useNavigate()


    const handleSubmit  =  async(e)=>{
      e.preventDefault()
      try {
         const {data} =  await axios.get(`http://localhost:7000/api/v1/employee/search/${values.keyword}`)
         setvalues({...values,results:data})
         navigate('/search')
      } catch (error) {
        console.log(error)
        alert('error in searchInput')
        
      }
    }
  return (
    <div>
     <form className="d-flex" onSubmit={handleSubmit} role="search">
       <input className="form-control me-2" type="search" value={values.keyword}
        onChange={(e)=>setvalues({...values,keyword:e.target.value})} placeholder="Search" aria-label="Search" />
       <button className="btn btn-outline-success"  type="submit">Search</button>
     </form>

    </div>
  )
}

export default SearchInput