
const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware for user authentication
const authenticateUser = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    // Check if token exists in request headers or cookies
    let token;
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization;
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Split the token by space
    const tokenArray = token.split(' ');
    const decoded = jwt.verify(tokenArray[1], process.env.JWT_SECRET_KEY); // Use tokenArray[1] as the token

    // Check if user is an admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // If user is an admin, set the user object on the request object and continue to the next middleware or route handler
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


  
  




module.exports = {
  authenticateUser,
  authenticateAdmin
};

