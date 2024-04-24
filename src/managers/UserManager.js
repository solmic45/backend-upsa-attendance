// userManager.js
const User = require('../models/User');

class UserManager {
    async registerUser(email, password) {
        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Create new user document
        const newUser = new User({  email, password });
        await newUser.save();
        const _user  = {
            email : newUser.email,
            isAdmin : newUser.isAdmin
        }
        return _user;
    }

    async getUserById(userId) {
        try {
            // Find user by ID in the database
            console.log("getUserById:", userId)
            const user = await User.findOne({_id: userId});
            console.log("Found user::", user)
             if (!user ) {
                throw new Error('User not found');
            }
          
            const _user  = {
                email : user.email,
                isAdmin : user.isAdmin
            }
            return _user;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw new Error('Error fetching user details');
        }
    }
}
module.exports = UserManager;