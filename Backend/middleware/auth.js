// Import the necessary modules
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

// Middleware function for authenticating requests using JSON Web Tokens (JWT)
function auth(req, res, next) {
    const token = req.header('token'); // Retrieve the token from the request headers
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' }); // If no token is provided, respond with a 401 status code and an error message

    try {
        const decoded = jwt.verify(token, 'secret');  // Verify the token using the secret key
        req.user = decoded; // Attach the decoded user information to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' }); // If token verification fails, respond with a 400 status code and an error message
    }
}

export default auth; // Export the authentication middleware to be used in other parts of the application