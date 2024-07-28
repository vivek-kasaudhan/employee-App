import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate  =  useNavigate()

  const handleDelete = async(id)=>{
    try {
        const {data} =  await axios.delete(`http://localhost:7000/api/v1/employee/delete/${id}`)
        alert('deleted successfully')
        setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
        console.log(error)
        alert('error in deleting')
    }
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get('http://localhost:7000/api/v1/employee/get-employees');
        if (data.success) {
          setEmployees(data.employees);
        } else {
          setError('Failed to fetch employees');
        }
      } catch (err) {
        setError('Error fetching employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <h1>All Employees</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Avatar</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>
                {employee.avatar && (
                  <img src={`http://localhost:7000/uploads/${employee.avatar}`} alt={employee.name} height="50" />
                )}
              </td>
              <td>{new Date(employee.time).toLocaleString()}</td>
              <td>
                <button onClick={()=>handleDelete(employee._id)}>Delete</button>
                <button onClick={() => navigate(`/dashboard/admin/update-employee/${employee._id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default AllEmployees;
