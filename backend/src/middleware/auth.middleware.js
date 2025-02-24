// logic of auth middleware
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectAuth = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No Token Provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid Token Provided' });
        }
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}