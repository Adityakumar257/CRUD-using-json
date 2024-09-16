/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const navigate = useNavigate(); // Use the useNavigate hook to navigate

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/users', formData)
      .then(res => {
        console.log('Response:', res);
        // Redirect to home page after successful submission
        navigate('/');
      })
      .catch(err => {
        console.error('Error:', err);
      });

    // Optional: Reset form data after submission
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="d-flex flex-column w-100 vh-100 justify-content-start align-items-center bg-light">
      <h1 className="mt-5">Fill The Form</h1>
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

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Create;
