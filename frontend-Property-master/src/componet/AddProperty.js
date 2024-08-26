//Import all neccesary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function AddProperty() {
  // State variables for form fields and token
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [token, setToken] = useState(null); // Token state
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")
  const apiUrl = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PROPERTY_CREATE_URL}`;
  useEffect(() => {
    // Retrieve token from sessionStorage
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      // Redirect to login if user is not authenticated
      navigate('/sign-in');
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      Swal.fire({
        title: 'Error!',
        text: 'User is not authenticated. Please log in.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/properties/add-property',
        {
          address,
          price,
          description,
          images, // Keep images as a single string
          contactInfo,
          user:userId
        },
        {
          headers: {
            'token': token // Include the token in the 'userId' header
          }
        }
      );
      Swal.fire({
        title: 'Success!',
        text: 'Property added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Reset form fields after successful submission
      setAddress('');
      setPrice('');
      setDescription('');
      setImages('');
      setContactInfo('');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.msg || 'Failed to add property. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('There was an error adding the property!', error);
    }
  };

  return (
    <>
      <Header />
      <div className="container border mb-3 p-4" style={{ marginTop: '100px' }}>
        <h2>Add Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Images (comma-separated URLs)</label>
            <input
              type="text"
              className="form-control"
              id="images"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactInfo" className="form-label">Contact Info</label>
            <input
              type="text"
              className="form-control"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Property</button>
        </form>
      </div>
    </>
  );
}

export default AddProperty; // Export component
