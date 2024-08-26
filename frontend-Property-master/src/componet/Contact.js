// Import React, hooks, axios, Swal, CSS styles, and routing utilities
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Signup.css';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const {state} = useLocation();
  // alert(state)
  console.log(state)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
    userId:state.agentId
  });

  useEffect(()=>{
    setFormData(prevFormData => ({
      ...prevFormData,
      userId: state.agentId
    }));
  },[state])
  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate input fields
  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.surname) {
      newErrors.surname = 'Surname is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    // Validate inputs before submitting
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    } else {
        setErrors({});
    }

    setFormData({ userId: state, ...formData });

    try {
        const result = await axios.post("http://localhost:3000/contact/add-contact", formData);
        console.log(result);
        setFormData({
            name: '',
            surname: '',
            email: '',
            message: ''
        });
        
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your message has been sent successfully!',
        });

    } catch (error) {
        console.error(error);

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to send your message. Please try again later.',
        });
    }
};

  return (
    <div id="contact" className="contact-us section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="0.5s" data-wow-delay="0.25s">
            <div className="section-heading">
              <h2>Feel Free To Send Us a Message About Your Website Needs</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doer ket eismod tempor incididunt ut labore et dolores</p>
              <div className="phone-info">
                <h4>
                  For any enquiry, Call Us: <span><i className="fa fa-phone"></i> <a href="#">010-020-0340</a></span>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-duration="0.5s" data-wow-delay="0.25s">
            <form id="contact" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <fieldset>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      autoComplete="on"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                  </fieldset>
                </div>
                <div className="col-lg-6 m-0">
                  <fieldset className="m-0">
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      placeholder="Surname"
                      autoComplete="on"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className={errors.surname ? 'input-error' : ''}
                    />
                    {errors.surname && <span className="text-danger error-message">{errors.surname}</span>}
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <span className="text-danger error-message">{errors.email}</span>}
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={errors.message ? 'input-error' : ''}
                    ></textarea>
                    {errors.message && <span className="text-danger error-message">{errors.message}</span>}
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <button type="submit" id="form-submit" className="main-button">
                      Send Message
                    </button>
                  </fieldset>
                </div>
              </div>
              <div className="contact-dec">
                <img src="assets/images/contact-decoration.png" alt="Contact Decoration" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; // Export component
