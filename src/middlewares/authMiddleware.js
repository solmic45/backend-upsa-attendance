// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const TokenManager = require('../managers/TokenManager');
const tokenManager = new TokenManager(); 

const authMiddleware = async (req, res, next) => {
    try {
         const authHeader = req.headers['authorization'];
        console.log("AuthHeader:", authHeader)
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        console.log("token:", token)
        const userId = await tokenManager.verifyToken(token);
        console.log("userId", userId)
        if (!userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.userId = userId;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authMiddleware;
