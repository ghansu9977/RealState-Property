import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dummy.css'; // Import the CSS file for styling

const ViewFavourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get user ID from local storage
        const userId = localStorage.getItem('userId');
    
        if (!userId) {
            setError('User not logged in.');
            setLoading(false);
            return;
        }

        axios.post("http://localhost:3000/properties/viewFavourites", { userId })
            .then(response => {
                setFavourites(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response?.data?.msg || 'An error occurred.');
                setLoading(false);
            });
    }, []);

    const remove = (propertyId) => {
        axios.delete(`http://localhost:3000/deleteProperty/${propertyId}`)
            .then(response => {
                // Remove the deleted property from the favourites state
                setFavourites(prevFavourites => prevFavourites.filter(property => property._id !== propertyId));
            })
            .catch(error => {
                setError(error.response?.data?.msg || 'An error occurred while deleting.');
            });
    };

    return (
        <div className="favourites-container">
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                <div className="favourites-grid">
                    {favourites.length === 0 ? (
                        <div className='container d-flex justify-content-center align-items-center'>
                            <img src="path/to/nodataImg" style={{ height: '400px', width: '400px' }} alt='No Data' />
                        </div>
                    ) : (
                        <div className="container-lg mt-5 p-4 mb-5 bg-light rounded">
                            <h2 className="m-2 text-center">Available Properties</h2>
                            <div className="row">
                                {favourites.map(property => (
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
                                                <button className="btn btn-primary" onClick={() => remove(property._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewFavourites;
