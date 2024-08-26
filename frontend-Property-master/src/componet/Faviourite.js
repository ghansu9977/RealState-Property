// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; 
import './dummy.css';

function Favorite() {
    const [favorites, setFavorites] = useState([]); // State for favorites
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate(); // Navigation hook
    const userId = localStorage.getItem("userId"); // Get user ID

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.post('http://localhost:3000/properties/viewFavourites', { userId });
                setFavorites(response.data);  // Update favorites
            } catch (error) {
                console.error('Error fetching favorites:', error);
                alert('Failed to fetch favorite properties.'); // Alert user
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchFavorites();
    }, [userId]);

    // Function to handle deletion of a property from favorites
    const handleDelete = async (propertyId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This action will remove the property from your favorites.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`http://localhost:3000/properties/deleteProperty/${propertyId}`, {
                    data: { userId }
                });

                if (response.status === 200) {
                    Swal.fire('Deleted!', 'The property has been removed from your favorites.', 'success');
                    setFavorites(favorites.filter(property => property._id !== propertyId));
                }
            }
        } catch (error) {
            console.error('Error deleting favorite:', error);
            Swal.fire('Error!', 'Failed to delete the property. Please try again.', 'error');
        }
    };

    // Display loading message while data is being fetched
    if (loading) {
        return <div className="container mt-5"><p>Loading favorites...</p></div>;
    }

    return (
        <div className="container-lg mt-5 p-4 mb-5 bg-light rounded">
            <h2 className="mb-4">Your Favorite Properties</h2>
            <div className="row">
                {!favorites.length ? (
                    <div className="col-12 text-center">
                        <p>You have no favorite properties.</p>
                    </div>
                ) : (
                    favorites.map(property => (
                        <div className="col-md-4 mb-4" key={property._id}>
                            <div className="card shadow-sm border-light">
                                <img
                                    src={property.images} // Display the first image
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
                                    <button className="btn btn-secondary" onClick={() => handleDelete(property._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Favorite; // Export the component
