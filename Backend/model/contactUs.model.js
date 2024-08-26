// Import Mongoose library
import mongoose from "mongoose";

// Define Contact schema
const ContactSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    surname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    message: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Create Contact model
const Contact = mongoose.model("Contact", ContactSchema);

// Export Contact model
export default Contact;
