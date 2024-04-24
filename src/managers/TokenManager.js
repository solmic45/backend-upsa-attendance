// tokenManager.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Token = require('../models/Token');
const secretKey = process.env.SECRET_KEY;

class TokenManager {
    
    async generateToken(userId) {
           // Delete all tokens associated with the user
        await Token.deleteMany({ userId });
        const token = jwt.sign({ userId },  secretKey, { expiresIn: '1h' });
        const tokenDoc = new Token({
            userId,
            token,
            expiresAt: new Date(Date.now() + 3600 * 1000) // Token expires in 1 hour
        });
        await tokenDoc.save();
        return token;
    }


        

    async verifyToken(token) {
        try {
            
            const tokenDoc = await Token.findOne({ token });
            console.log("found token::", tokenDoc)
            if (!tokenDoc || tokenDoc.expiresAt < Date.now()) {
                console.log('expired token')
                return null; // Token not found or expired
            }
            const decodedToken = jwt.verify(token, secretKey);
            console.log("decoded:::", decodedToken)
            const userId = decodedToken.userId;
    
            return   userId;
        } catch (error) {
            console.error('Error verifying token:', error);
            throw new Error('Token verification failed');
        }
    }

    async revokeToken(token) {
        try {
            await Token.deleteOne({ token });
        } catch (error) {
            console.error('Error revoking token:', error);
            throw new Error('Token revocation failed');
        }
    }
}

module.exports = TokenManager ;
