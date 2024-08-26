// Import necessary libraries and models
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const registerMultipleUsers = async (req, res) => {
    const users = req.body; // Expecting an array of users [{ name, email, password }, ...]

    if (!Array.isArray(users)) {
        return res.status(400).json({ msg: 'Invalid data format. Expected an array of users.' });
    }

    try {
        const savedUsers = await Promise.all(users.map(async (userData) => {
            const { name, email, password } = userData;

            // Check if the user already exists
            let user = await User.findOne({ email });
            if (user) {
                return { email, error: 'User already exists' };
            }

            // Create a new user
            user = new User({ name, email, password });
            await user.save();

            // Generate a token
            const token = jwt.sign({ id: user._id }, 'secret');
            return { email, token };
        }));

        return res.status(201).json({ msg: 'Users processed', data: savedUsers });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};


// User Registration
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password });
        await user.save(); // Save new user


        const token = jwt.sign({ id: user._id }, 'secret',);
        console.log('token: ', token);
        return res.status(201).json({ token ,user}); // Log generated token
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Server error' }); // Log error
    }
};

// User Login
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secret',);
        res.status(200).json({
            msg: 'Login successfully',
            token: token,
            user
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err });
    }
};
