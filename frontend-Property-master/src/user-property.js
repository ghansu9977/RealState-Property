import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import noproperty from './Images/NoProperty.png';
import Header from "./componet/Header";
import { useNavigate } from "react-router-dom";

export default function UserProperty() {
    const userId = localStorage.getItem("userId");
    const [property, setProperty] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.post("http://localhost:3000/properties/view-property-of-user", { userId })
            .then(result => {
                setProperty(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [userId]);

    const handleEdit = (data) => {
        setEditData(data);
        setIsEditing(true);
    };

    const handleDelete = (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/properties/deleteProperty/${data._id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'Your property has been deleted.', 'success');
                        setProperty(property.filter(item => item._id !== data._id));
                    })
                    .catch(err => {
                        Swal.fire('Error!', 'There was a problem deleting the property.', 'error');
                        console.log(err);
                    });
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/properties/updateProperty/${editData._id}`, editData)
            .then(response => {
                Swal.fire('Updated!', 'The property has been updated.', 'success');
                setProperty(property.map(p => p._id === editData._id ? response.data : p));
                setIsEditing(false);
            })
            .catch(error => {
                Swal.fire('Error!', 'There was a problem updating the property.', 'error');
                console.error(error);
            });
    };

    return (
        <>
            <Header />
            {property.length > 0 ? (
                <section>
                    <h1 className="text-center">User Properties...</h1>
                    <div className="container-fluid p-2 border">
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <h2>Edit Property</h2>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={editData?.address || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={editData?.price || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={editData?.description || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Info</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contactInfo"
                                        value={editData?.contactInfo || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Property</button>
                                <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
                            </form>
                        ) : (
                            <table className="table m-auto border" style={{ width: '90%' }}>
                                <thead>
                                    <tr className="border">
                                        <th style={{ width: '100px' }}>Sr. No.</th>
                                        <th>Property Image</th>
                                        <th>Address</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>Contact</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {property.map((data, index) => (
                                        <tr key={data._id} className="border">
                                            <td>{index + 1}</td>
                                            <td>
                                                {data.images[0] ? (
                                                    <img src={data.images[0]} alt="Property" style={{ width: '200px', height: '200px' }} />
                                                ) : (
                                                    <img src={noproperty} alt="No Property" style={{ width: '200px', height: '200px' }} />
                                                )}
                                            </td>
                                            <td>{data.address}</td>
                                            <td>{data.price}</td>
                                            <td>{data.description}</td>
                                            <td>{data.contactInfo}</td>
                                            <td><span onClick={() => handleEdit(data)}>edit</span></td>
                                            <td><span onClick={() => handleDelete(data)}>delete</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            ) : (
                <section className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <img style={{ width: '400px', height: '400px' }} src={noproperty} alt="No Properties" />
                    <button onClick={()=>navigate("/AddProperty")} className="btn btn-primary">Add property</button>
                </section>
            )}
        </>
    );
}
