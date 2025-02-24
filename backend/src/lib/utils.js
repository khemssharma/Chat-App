import jwt from 'jsonwebtoken';

export const generateToken = (user, res) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    res.cookie('jwttoken', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'None',
        secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    return token;
}
export default generateToken;