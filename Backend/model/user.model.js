// Import necessary modules
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define a schema for the 'User' model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // Unique user email
    password: { type: String, required: true } // User's password
});

// Password Hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Proceed if password has not been modified
    const salt = await bcrypt.genSalt(10); // Generate salt and hash password
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save the user
});

const User = mongoose.model('User', userSchema); // Create 'User' model from schema and export it
export default User;