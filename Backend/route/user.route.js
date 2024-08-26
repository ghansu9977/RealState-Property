// Import necessary modules and functions
import express from "express";
import { register,registerMultipleUsers,signIn } from "../controller/user.controller.js";
import auth from '../middleware/auth.js';

// Initialize router
const router = express.Router();

// Route for user registration
router.post("/register", register);
// Route for user sign-in
router.post("/signIn", signIn);
// Route to register multiple users in bulk
router.post("/add-user-in-bulk",registerMultipleUsers)
export default router;
