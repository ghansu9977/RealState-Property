import mongoose from "mongoose"; // Import the Mongoose library for MongoDB object modeling

// Define schema for the 'Property' model
const propertySchema = new mongoose.Schema({
  address: { type: String, required: true },  // Property address
  price: { type: Number, required: true }, // Property price
  description: { type: String, required: true }, // Property description
  images: [String], // Array of image URLs
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User who listed the property
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // Array of User references who favorited the property
    }
  ],
  contactInfo: { type: String, required: true }, // Contact information for inquiries
});

// Create 'Property' model from schema and export it  
const Property = mongoose.model("Property", propertySchema); 

export default Property;
