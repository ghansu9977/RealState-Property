import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './dummy.css';
import nodataImg from '../Images/NoData.png';

function DummyProperty(props) {
  const navigate = useNavigate();
  const { properties } = props;

  const addContact = (agentId) => {
    navigate('/contact', { state: { agentId } });
  };

  const markAsFavorite = (propertyId) => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: 'Please log in to mark properties as favorites.',
      });
      return;
    }

    axios.post(
      'http://localhost:3000/properties/favorite',
      { propertyId, userId } // Send both propertyId and userId in the request body
    )
    .then(result => {
      // Print response message inside .then
      console.log('Response:', result.data);
      Swal.fire({
        icon: 'success',
        title: 'Added to Favorites',
        text: 'Property added to favorites!',
      });
    })
    .catch(err => {
      // Print error message inside .catch
      console.error('Error marking property as favorite:', err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add to Favorites',
        text: err.response?.data?.msg || 'Failed to mark property as favorite. Please try again.',
      });
    });
  };

  return (
    <>
      <div className="container-lg mt-5 p-4 mb-5 bg-light rounded">
        <h2 className="m-2 text-center">Available Properties</h2>
        <div className="row">
          {properties.length === 0 ? (
            <div className='container d-flex justify-content-center align-items-center'>
              <img src={nodataImg} style={{ height: '400px', width: '400px' }} alt='no image' />
            </div>
          ) : (
            properties.map(property => (
              <div className="col-md-4 mb-4" key={property._id}>
                <div className="card shadow-sm border-light">
                  <img
                    src={property.images[0]} // Display the first image
                    className="card-img-top"
                    alt={property.address || 'Property Image'}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{property.address}</h5>
                    <p className="card-text price-text">Price: Rs. {property.price}</p>
                    <p className="card-text">
                      <strong>Description:</strong> {property.description.length > 200
                        ? `${property.description.slice(0, 200)}...`
                        : property.description
                      }
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={() => addContact(property._id)}>Contact</button>
                    <button className="btn btn-secondary" onClick={() => markAsFavorite(property._id)}>Add to Favorite</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default DummyProperty;
