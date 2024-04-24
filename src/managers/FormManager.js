// formManager.js
const Form = require('../models/Form');

class FormManager {
    async createForm(  formData) {
        // Logic for form creation
        console.log("formdata:", formData)
        const form = new Form(formData);
   // Save the form document to the database
        await form.save();
        return form;
    }

    async getFormsByUserId(userId) {
        // Logic for retrieving forms by user ID
    }

    async getAllForms(page, limit) {
        try {
            const forms = await Form.find()
              .skip((page - 1) * limit)
              .limit(limit);
            return forms
          } catch (error) {
            console.error('Error fetching forms:', error);
            throw new Error('Form fetch failed');
          }
    }

    // Other form-related methods as needed
}

module.exports = FormManager;
