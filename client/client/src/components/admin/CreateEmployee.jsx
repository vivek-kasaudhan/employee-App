import React, { useState } from 'react'
import Layout from '../layout/Layout'
import axios from 'axios'

const CreateEmployee = () => {
    const[name,setName] =  useState('')
    const[email,setEmail] =  useState('')
    const [mobile, setmobile] = useState('')
    const[designation,setDesignation] = useState('')
    const[Gender,setGender] =  useState('')
    const[course,setCourse] =  useState('')
    const[image,setImage] =  useState(false)
    const[photoUrl,setPhotoUrl] =  useState('')

  const  options =  [
    'HR','MANAGER','SALES'
  ]

const handleCreate = async(e)=>{
  e.preventDefault()
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobileNo',mobile)
    formData.append('designation',designation)
    formData.append('gender',Gender)
    formData.append('course',course)
    if (image) {
      formData.append('avatar', image);

    }
    // formData.append()

    const {data} =  await axios.post('http://localhost:7000/api/v1/employee/create-employee',formData)

    if(data && data.success){
      console.log(data)
     alert('employee created succcessfully')
     setPhotoUrl(`http://localhost:7000/uploads/${data.newEmployee.avatar}`)
     
    }else{
      alert('error in employee')
    }
  } catch (error) {
    console.log(error)
  }
}


  return (
    <Layout>
        <form onSubmit={handleCreate}>
 <div className="mb-3">
     <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='name of employee' className="form-control" id="exampleInputEmail1" required  />
  </div>

  <div className="mb-3">
    
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className="form-control" id="exampleInputEmail1"  />
  </div>
  <div className="mb-3">
    
    <input type="number" value={mobile} onChange={(e)=>setmobile(e.target.value)} placeholder='mobile No' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
  
<label>Designation :</label>
  <select value={designation} onChange={(e)=>setDesignation(e.target.value)}>
                <option>Please choose one option</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
 </select>

  </div>
  <div className="mb-3 ">
  <div>
    <label>Gender: </label>
  <input
        type="radio"
        name="gender"
        value="female"
        id="F"
        onChange={(e)=>setGender(e.target.value)}
        checked={Gender === "female"}
    />
    <label htmlFor="female">female</label>
  
  <input
        type="radio"
        name="gender"
        value="male"
        id="M"
        onChange={(e)=>setGender(e.target.value)}
        checked={Gender === "male"}
      />
      <label htmlFor="male">male</label>
  
</div>

  </div>

  <div className="mb-3">
  <label>course: </label>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="MCA" id="MCA" onChange={(e) => setCourse(e.target.value)} checked={course === "MCA"} />
    <label className="form-check-label" htmlFor="MCA">
      MCA
    </label>
  </div>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="BCA" id="BCA" onChange={(e) => setCourse(e.target.value)} checked={course === "BCA"} />
    <label className="form-check-label" htmlFor="BCA">
      BCA
    </label>
  </div>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="BCS" id="BCS" onChange={(e) => setCourse(e.target.value)} checked={course === "BCS"} />
    <label className="form-check-label" htmlFor="BCS">
      BCS
    </label>
  </div>
  
<div className="mb-3">
    <label>
         {image?image.name:'Upload photo'}
        <input type='file' name='image' accept='image/*'onChange={(e)=>{
            const file = e.target.files[0];
            setImage(file);
            setPhotoUrl(URL.createObjectURL(file));
            }}  />

    </label>
</div>
<div>
       {photoUrl && (
             <div className="text-center">
                 <img src={photoUrl} alt="phto"  height={"100px"}  className='img img-responsive' />
             </div>
                  )}
 </div>

  </div>
  <button type="submit" className="btn btn-primary">Create</button>
</form>

    </Layout>
  )
}

export default CreateEmployee