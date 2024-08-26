import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const apiUrl = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_USER_REGISTER_URL}`;

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setName(value);
            if (value.trim() === '') {
                setErrors((prev) => ({ ...prev, name: 'Name is required' }));
            } else {
                setErrors((prev) => ({ ...prev, name: '' }));
            }
        } else if (name === 'email') {
            setEmail(value);
            if (!validateEmail(value)) {
                setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
            } else {
                setErrors((prev) => ({ ...prev, email: '' }));
            }
        } else if (name === 'password') {
            setPassword(value);
            if (value.length < 6) {
                setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
            } else {
                setErrors((prev) => ({ ...prev, password: '' }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for any remaining errors
        if (!name || !email || !password || errors.name || errors.email || errors.password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all fields correctly!',
            });
            return;
        }

        axios.post(apiUrl, { name, email, password })
            .then(response => {
                console.log('User created:', response.data.token);
                localStorage.setItem("userId",response.data.user._id)
                localStorage.setItem('token', response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Account created successfully!',
                });
                navigate("/")
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.msg || 'Something went wrong. Please try again.',
                });

                console.log('Error:', error);
            });
    };

    return (
        <section className="d-flex justify-content-center align-content-center w-100">
            <div className="form-container mt-5">
                <p className="title">Create account</p>
                <p className="sub-title">Let's get started with your 30 days free trial</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Name" 
                        name="name"
                        value={name} 
                        onChange={handleChange} 
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                    <input 
                        type="email" 
                        className="input" 
                        placeholder="Email" 
                        name="email"
                        value={email} 
                        onChange={handleChange} 
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                    <input 
                        type="password" 
                        className="input" 
                        placeholder="Password" 
                        name="password"
                        value={password} 
                        onChange={handleChange} 
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}

                    <button className="form-btn">Create account</button>
                </form>
                <p className="sign-up-label">
                    Already have an account?<span className="sign-up-link"> <Link to="/sign-in">Login</Link> </span>
                </p>
            </div>
        </section>
    );
}
