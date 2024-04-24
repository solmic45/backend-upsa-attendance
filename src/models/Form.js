const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    indexNumber: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true  },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    currentLevel: { type: String, enum: ['Level 100', 'Level 200', 'Level 300', 'Level 400', 'Diploma Year One', 'Diploma Year Two', 'GAF'], required: true },
    phoneNumber: { type: String, required: true },
    lecturerName: { type: String, required: true },
    groupings:{ type: String, required: true },
    instructorSeen: { type: Boolean, required: true },
    courseLevel: { type: String, enum: ['Diploma (Year 1 and 2)', 'Bachelors Level 100', 'Bachelors Level 200', 'Bachelors Level 300', 'Bachelors Level 400'], required: true },
    level400Course: { type: String },
    // Add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
