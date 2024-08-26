import multer from 'multer';
import Property from '../model/property.model.js';

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the destination directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // set the file name
    }
});

// Initialize multer
const upload = multer({ storage: storage }).array('images', 5); // Allow up to 5 images

export const addProperty = (req,res)=>{
    console.log(req.body)
    Property.create(req.body).then(result=>{
        return res.status(200).json({ msg: 'data added', result });
    }).catch(err=>{
        console.log(err)            
        return res.status(500).json({ msg: 'Internal server error', err });
    })
}

export const createProperty = (req, res) => {
    // Use multer middleware to handle file uploads
    upload(req, res, async function (err) {
        if (err) {
            console.log(err)
            return res.status(500).json({ msg: 'File upload error', err });
        }

        const { address, price, description, contactInfo, userId } = req.body;

        // Validate required fields
        if (!address || !price || !description || !contactInfo || !userId) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Get file paths from uploaded files
        const images = req.files.map(file => file.path);

        try {
            // Create a new property instance
            const newProperty = new Property({
                address,
                price,
                description,
                images,
                contactInfo,
                user: userId
            });

            // Save the property to the database
            await newProperty.save();

            // Respond with the created property
            res.status(201).json(newProperty);
        } catch (err) {

            // Log error and respond with a server error message
            console.error('Error creating property:', err);
            res.status(500).json({ msg: 'Server error', err });
        }
    });
};


export const createMultipleProperties = (req, res) => {
    // Use multer middleware to handle file uploads
    upload(req, res, async function (err) {
        if (err) {
            console.error('File upload error:', err);
            return res.status(500).json({ msg: 'File upload error', err });
        }

        // Properties should be an array of objects in req.body
        const properties = req.body;

        // Validate properties array
        if (!Array.isArray(properties) || properties.length === 0) {
            return res.status(400).json({ msg: 'Invalid or empty properties array' });
        }

        try {
            const newProperties = [];
            const files = req.files; // All uploaded files
            let fileIndex = 0; // Index for tracking file positions

            // Iterate through properties and assign images
            for (const property of properties) {
                const { address, price, description, contactInfo, user, images } = property;

                // Validate required fields
                if (!address || !price || !description || !contactInfo || !user) {
                    return res.status(400).json({ msg: 'Missing required fields in property' });
                }

                // Determine the number of images for this property
                const numImages = images ? images.length : 0;
                const propertyImages = [];

                // Map file paths to images
                for (let j = 0; j < numImages; j++) {
                    if (fileIndex < files.length) {
                        propertyImages.push(files[fileIndex].path);
                        fileIndex++;
                    }
                }

                // Create a new property instance
                const newProperty = new Property({
                    address,
                    price,
                    description,
                    images: propertyImages,
                    contactInfo,
                    user
                });

                // Save the property to the database
                await newProperty.save();
                newProperties.push(newProperty);
            }

            // Respond with the created properties
            res.status(201).json(newProperties);
        } catch (err) {
            // Log error and respond with a server error message
            console.error('Error creating properties:', err);
            res.status(500).json({ msg: 'Server error', err });
        }
    });
};
// Get All Properties
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Search Properties
export const searchProperties =  async (req, res) => {
    try {
        const { address } = req.query; // Get the address from query parameters
        const properties = await Property.find({
            address: new RegExp(address, 'i') // Case-insensitive search
        });
        res.json(properties);
    } catch (err) {
        console.error('Error searching properties:', err);
        res.status(500).send('Server error');
    }
};

// Mark as Favorite
export const markAsFavorite = async (req, res) => {
    try {
        const { propertyId, userId } = req.body; // Extract propertyId and userId from the request body
        const property = await Property.findById(propertyId);
        
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        if (property.favorites.includes(userId)) {
            return res.status(400).json({ msg: 'Property already in favorites' });
        }
        
        property.favorites.push(userId);
        await property.save();
        res.status(200).json(property);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error', err });
    }
};

// Get Favorites
export const getFavorites = async (req, res) => {
    console.log(res.body)
    try {
        const properties = await Property.find({ favorites: req.body.userId });
        res.status(200).json(properties);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete Property

export const unmarkAsFavorite = async (req, res) => {
    try {
        const { propertyId, userId } = req.body; // Extract propertyId and userId from the request body
        const property = await Property.findById(propertyId);
        
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        // Check if userId is in the favorites array
        if (!property.favorites.includes(userId)) {
            return res.status(400).json({ msg: 'Property is not in favorites' });
        }
        
        // Remove userId from the favorites array
        property.favorites = property.favorites.filter(id => !id.equals(userId));
        await property.save();
        
        res.status(200).json(property);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error', err });
    }
};


export const viewPropertyOfParticularUser= async(req,res)=>{
    console.log(req.body)
    try {
        const userId = req.body.userId; // Assuming authMiddleware attaches the user ID to req.user

        const properties = await Property.find({ user: userId }).populate('user', 'name email');

        if (!properties) {
            return res.status(404).json({ msg: 'No properties found for this user.' });
        }

        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

//update propertyt
 export const updateProperty = async (req, res) => {
     console.log(req.params+" abc")
    console.log(req.body)
    try {
      // Extract property ID and update data from the request
      const { id } = req.params;
      const updateData = req.body;
  
      // Find the property by ID and update with the new data
      const updatedProperty = await Property.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators are applied
      });
  
      // Check if the property was found and updated
      if (!updatedProperty) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Send the updated property back in the response
      res.json(updatedProperty);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
 }