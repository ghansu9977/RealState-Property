import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons
import axios from 'axios';

function Header(props) {
  
  const {setProperties} = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimeoutRef = useRef(null); // Ref to store the timeout ID

  useEffect(() => {
    // Check if token exists in localStorage or sessionStorage
    const token = localStorage.getItem('userId') || sessionStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAddPropertyClick = () => {
    navigate('/AddProperty');
  };

  const handleLoginClick = () => {
    navigate('/register');
  };

  const handleLogoutClick = () => {
    // Remove token from storage
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to homepage or any other page after logout
  };

  // Function to fetch properties based on search term
  const fetchFilteredProperties = (term) => {
    axios.get(`http://localhost:3000/properties/searchProperties?address=${term}`)
    .then(result => {
        console.log(result.data)
        setProperties(result.data)
        setFilteredProperties(result.data);
      })
      .catch(err => {
        console.error('Error searching properties:', err);
      });
  };

  // Debounce handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear the previous timeout if it exists
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      fetchFilteredProperties(value);
    }, 300); // 300ms debounce delay
  };

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/" aria-label="Home">
            <h4 className="mb-0">Real<span className="text-primary">State</span></h4>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="/" aria-current="page">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/user-property")}>Properties</a>
              </li>
            </ul>
            <form className="d-flex ms-auto mb-2 mb-lg-0" role="search">
              <input
                className="form-control me-2"
                onChange={handleSearch}
                type="search"
                placeholder="Enter location.."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div className="d-flex ms-2">
              {isAuthenticated ? (
                <>
                  <button className="btn btn-danger me-2" onClick={handleLogoutClick} aria-label="Logout">Logout</button>
                  <button className="btn btn-info" onClick={handleAddPropertyClick} aria-label="Add Property">Add Properties</button>
                </>
              ) : (
                <button className="btn btn-primary me-2" onClick={handleLoginClick} aria-label="Login">Login</button>
              )}
              <button className="btn btn-light">
                <FaHeart size={20} aria-label="Favorites" onClick={()=>navigate("/viewfavorite")} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
