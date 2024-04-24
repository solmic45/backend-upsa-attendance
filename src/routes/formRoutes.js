// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const authMiddleware = require('../middlewares/authMiddleware');
const FormManager = require('../managers/FormManager');
const UserManager = require('../managers/UserManager');

const userManager = new UserManager();
const formManager = new FormManager();
// Route for submitting a form (protected route)
router.post('/submit', authMiddleware, async (req, res) => {
    try {
        const {userId } = req.userId
      
        
        // Extract form data from request body
        const user =  await userManager.getUserById( req.userId);
        const email =  user.email
        const { indexNumber, name, gender, currentLevel, phoneNumber, groupings, lecturerName, instructorSeen, courseLevel, level400Course } = req.body;

        // Set instructorSeen based on the received value
        const instructorSeenValue = instructorSeen === 'Yes' ? true : (instructorSeen === 'No' ? false : null);

        // Create a new form document
        const formData = {userId: req.userId, indexNumber, name, email, gender, currentLevel, phoneNumber, lecturerName, groupings, instructorSeen: instructorSeenValue, courseLevel, level400Course }
        const newForm = await  formManager.createForm( formData)
         
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/get-forms', authMiddleware, async (req, res) => {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
        const forms  = await formManager.getAllForms(page, limit)
        
        const totalForms = await Form.countDocuments();
        const totalPages = Math.ceil(totalForms / limit);

        res.status(200).json({ forms, totalPages });
      } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });

// Add other form-related routes as needed

module.exports = router;
