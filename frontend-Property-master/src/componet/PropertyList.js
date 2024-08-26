import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Get token from session storage

    if (token) {
      axios.get('http://localhost:5000/api/properties', {
        headers: {
          'token': token, // Pass the token in the custom 'token' header
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the properties!', error);
      });
    }
  }, []);

  return (
    <div className="container-lg mt-5 shadow-lg p-4 mb-5 bg-white rounded">
      <div className="row">
        {properties.map((property) => (
          <div className="col-md-4" key={property.id}>
            <div className="card mb-4">
              <img
                src={property.images[0]} // Assuming the first image is used as the thumbnail
                className="card-img-top"
                alt={property.address}
              />
              <div className="card-body">
                <h5 className="card-title">{property.address}</h5>
                <p className="card-text">Price: {property.price}</p>
                <p className="card-text">{property.description}</p>
                <a href={`mailto:${property.contactInfo}`} className="btn btn-primary">
                  Contact
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
