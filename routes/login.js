const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Import the User model
require('dotenv').config(); // Load dotenv configuration

// Login user
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user with given email in the database using Sequelize
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create and sign a JWT token for authentication
    const token = jwt.sign({ email: user.email, role:user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, role: user.role });

    // Return the token as a JSON response
 } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


