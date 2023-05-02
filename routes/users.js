const express = require('express');
const router = express.Router();
const User = require('../models/users'); 

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();

 
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await User.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
