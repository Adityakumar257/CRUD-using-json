/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Add error state
  const { id } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:3000/users/' + id)
      .then((res) => {
        console.log('Data fetched:', res.data); // Log fetched data
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data'); // Set error message
      });
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>; // Display error if it exists

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Detail of User</h3>
        <div className='mb-2'>
          <strong>Name: </strong>{data.name || 'Loading...'}
        </div>
        <div className='mb-2'>
          <strong>Email: </strong>{data.email || 'Loading...'}
        </div>
        <div className='mb-2'>
          <strong>Phone: </strong>{data.phone || 'Loading...'}
        </div>
        <Link to={`/update/${id}`} className='btn btn-success me-2'>Edit</Link>
        <Link to="/" className='btn btn-secondary'>Back</Link>
      </div>
    </div>
  );
};

export default Read;
