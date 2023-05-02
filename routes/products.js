const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const {authenticateAdmin} = require('../middlewares/auth');

// Get all products
router.get('/',  async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new product
router.post('/', authenticateAdmin, async (req, res) => {
  const { name, furnitureCategoryId, price } = req.body;
  try {
    const product = await Product.create({ name, furnitureCategoryId, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a product by ID
router.put('/:id', authenticateAdmin,  async (req, res) => {
  try {
    const { name, furnitureCategoryId, price } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.update({ name, furnitureCategoryId
, price });
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', authenticateAdmin,async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.destroy();
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
