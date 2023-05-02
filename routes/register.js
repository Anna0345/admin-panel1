const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator'); 
const passwordValidator = require('password-validator'); // Import the password-validator library
const User = require('../models/users'); // Import the User model

// Register a new user
router.post('/', async (req, res) => {
  try {
    const { email, password, role } = req.body; // Extract email and password from request body
    
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Check if email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a password schema with validation rules
    const passwordSchema = new passwordValidator();
    passwordSchema
      .is().min(8) // Minimum length is 8
      .has().uppercase() // Must contain uppercase letters
      .has().lowercase() // Must contain lowercase letters
      .has().digits() // Must contain digits
      .has().symbols(); // Must contain special characters

    // Validate password against the schema
    if (!passwordSchema.validate(password)) {
      return res.status(400).json({ error: 'Invalid password. Password must be at least 8 characters long and contain uppercase letters, lowercase letters, digits, and special characters' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user in the database
    const newUser = await User.create({ email, password: hashedPassword , role});
    
    // Return the created user object
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;



