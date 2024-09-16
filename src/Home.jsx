/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate(); // Use the hook for navigation

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Would you like to delete?");
    
        if (confirmDelete) {
            axios.delete('http://localhost:3000/users/' + id)
            .then(res => {
                // Update state without reloading the page
                setData(data.filter(user => user.id !== id));
            })
            .catch(err => console.log(err));  // Handle the error
        }
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/users")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light min-vh-100 text-center mt-5">
            <h1 className="text-center">List of Users</h1>
            <div className="container">
                <div className="w-100 rounded bg-white border shadow p-4 mt-2">
                    {/* Add button with margin-top for spacing */}
                    <div className="d-flex justify-content-end mt-3"> 
                        <Link to="/Create" className="btn btn-success">Add+</Link>
                    </div>

                    {/* Table with responsive class */}
                    <div className="table-responsive mt-3">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((d, i) => (
                                        <tr key={i}>
                                            <td>{d.id}</td>
                                            <td>{d.name}</td>
                                            <td>{d.email}</td>
                                            <td>{d.phone}</td>
                                            <td>
                                                <div className="d-flex flex-wrap justify-content-start">
                                                    <Link to={`/read/${d.id}`} className="btn btn-sm btn-success me-2 mb-2">Read</Link>
                                                    <Link to={`/Update/${d.id}`} className="btn btn-sm btn-primary me-2 mb-2">Edit</Link>
                                                    <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger mb-2">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
