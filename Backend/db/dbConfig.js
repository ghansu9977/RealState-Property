// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/realStateListing")
    .then(() => {
        // Log success message on successful connection
        console.log("Database connected....");
    })
    .catch(err => {
        // Log error message if connection fails
        console.log("Connection failed....", err);
    });

// Export the Mongoose connection instance for use in other modules
export default mongoose.connection;
