import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateEmployee = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const [image, setImage] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');

    const options = ['HR', 'MANAGER', 'SALES'];

    const getSingleEmployee = async () => {
        try {
            const { data } = await axios.get(`http://localhost:7000/api/v1/employee/get-single-employee/${id}`);
            if (data && data.success) {
                setName(data.employee.name);
                setEmail(data.employee.email);
                setMobile(data.employee.mobileNo);
                setDesignation(data.employee.designation);
                setGender(data.employee.gender);
                setCourse(data.employee.course);
                setPhotoUrl(`http://localhost:7000/uploads/${data.employee.avatar}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleEmployee();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('mobileNo', mobile);
            formData.append('designation', designation);
            formData.append('gender', gender);
            formData.append('course', course);
            if (image) {
                formData.append('avatar', image);
            }

            const { data } = await axios.put(`http://localhost:7000/api/v1/employee/update-employee/${id}`, formData);

            if (data && data.success) {
                alert('Employee updated successfully');
                setPhotoUrl(`http://localhost:7000/uploads/${data.updatedEmployee.avatar}`);
            } else {
                alert('Error updating employee');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name of employee"
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Mobile No"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label>Designation:</label>
                    <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                        <option>Please choose one option</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <div>
                        <label>Gender:</label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === 'female'}
                        />
                        <label htmlFor="female">Female</label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === 'male'}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label>Course:</label>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="MCA"
                            id="MCA"
                            onChange={(e) => setCourse(e.target.value)}
                            checked={course === 'MCA'}
                        />
                        <label className="form-check-label" htmlFor="MCA">
                            MCA
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="BCA"
                            id="BCA"
                            onChange={(e) => setCourse(e.target.value)}
                            checked={course === 'BCA'}
                        />
                        <label className="form-check-label" htmlFor="BCA">
                            BCA
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="BCS"
                            id="BCS"
                            onChange={(e) => setCourse(e.target.value)}
                            checked={course === 'BCS'}
                        />
                        <label className="form-check-label" htmlFor="BCS">
                            BCS
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label>
                        {image ? image.name : 'Upload photo'}
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setImage(file);
                                setPhotoUrl(URL.createObjectURL(file));
                            }}
                        />
                    </label>
                </div>

                <div>
                    {photoUrl && (
                        <div className="text-center">
                            <img src={photoUrl} alt="Employee" height="100px" className="img img-responsive" />
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </Layout>
    );
};

export default UpdateEmployee;
