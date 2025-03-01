import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from "../lib/cloudinary.js"; 

// Register a new user
export const signup = async (req, res) => {
    const {fullname, email, password }= req.body;
    try {
        if (!password || !email || !password){
            return res.status(400).json({message: 'Please fill in all fields'});
        }
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
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
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
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
          });
        } catch (error) {
        res.status(400).json({ message: error.message,  });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const changeProfilePic = async (req, res) => {
    try{
        const { profilePic } = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: 'Please upload a profile picture' });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ message: 'Profile picture not updated' });
        }
        
        res.status(200).json(updatedUser);
    }catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

export const checkAuth = async (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error){
        res.status(500).json({message: "Internal Server Error."})
    }
}