// Import necessary modules and functions
import express from 'express';
import auth from '../middleware/auth.js';
import { createProperty, getAllProperties, updateProperty, markAsFavorite, getFavorites, searchProperties, unmarkAsFavorite, createMultipleProperties, addProperty, viewPropertyOfParticularUser } from '../controller/property.controller.js';

const router = express.Router(); // Initialize router

router.post("/createProperty", createProperty); // Route to create a new property
router.post("/add-property", auth, addProperty); // Route to add a property
router.get("/viewProperties", getAllProperties); // Route to get all properties
router.get("/searchProperties", searchProperties); // Route to search for properties
router.post("/favorite", markAsFavorite); // Route to mark a property as favorite
router.post("/viewFavourites", getFavorites); // Route to get all favorite properties of a user
router.delete("/deleteProperty/:id", unmarkAsFavorite); // Route to unmark a property as favorite
router.post("/add-property-in-bulk", createMultipleProperties); // Route to add properties in bulk
router.post("/view-property-of-user", viewPropertyOfParticularUser) // Route to get properties of a particular user
router.put('/updateProperty/:id', updateProperty); // Route to update a property by ID

// Export the router
export default router;