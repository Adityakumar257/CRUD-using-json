/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing data
    axios.get(`http://localhost:3000/users/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/users/${id}`, formData)
      .then(res => {
        console.log('Data updated successfully:', res);
        navigate('/'); // Redirect after successful update
      })
      .catch(err => console.error('Error updating data:', err));
  };

  return (
    <div className="d-flex flex-column w-100 vh-100 justify-content-start align-items-center bg-light">
      <h1 className="mt-5">Update User Information</h1>
      <form onSubmit={handleSubmit} className="w-50 mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">We ll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default Update;
