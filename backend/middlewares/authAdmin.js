
     


import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        console.log(atoken);

        if (!atoken) {
            return res.json({ success: false, message: ' Please login again.' });
        }

        // Decode and verify JWT
        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        // Check if email in token matches admin
        if (token_decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: 'Invalid token' });
        }

        req.admin = token_decoded; // Optional
        next(); // Continue to route
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authAdmin;
