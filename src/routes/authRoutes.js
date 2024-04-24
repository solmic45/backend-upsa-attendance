// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const TokenManager = require('../managers/TokenManager'); 
const UserManager = require('../managers/UserManager');
const authMiddleware = require('../middlewares/authMiddleware');


// Initialize UserManager
const userManager = new UserManager();
const tokenManager = new TokenManager()

router.post('/register', async (req, res) => {
    try {
        const {   email, password } = req.body;
        console.log("user register", email , password)
            // Check if email is already registered
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(401).json({ error: 'Email already registered' });
            }

        // Register user
     
            const newUser = await userManager.registerUser(email, password);
            res.status(201).json(newUser);

      
    } catch (error) {
        console.error('Error registering user:', error);
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        console.log("user login", email , password)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Check password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = await tokenManager.generateToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for fetching user details by user ID
router.get('/get-user', authMiddleware, async (req, res) => {
    try {
        console.log("in getuser")

         console.log("userId:", req.userId)
 
        const user = await userManager.getUserById( req.userId);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Add other user-related routes as needed

module.exports = router;
