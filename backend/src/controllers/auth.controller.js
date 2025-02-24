import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';

// Register a new user
export const signup = async (req, res) => {
    const {fullname, email, password }= req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const user = await User.findOne({ email });  
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: hashed_password });
        if (!newUser) {
            return res.status(400).json({ message: 'User not created' });
        }
        else{
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(200).json({ message: 'User created successfully' });  
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //generate jwt token
        generateToken(user._id, res);
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    res.send("logout route");
}