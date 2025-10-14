import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }
        
        // Set user ID in req.user (standard practice)
        req.user = { id: decoded.id };
        
        // Also set in req.body for backward compatibility
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = decoded.id;
        
        next();
        
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};

export default userAuth;