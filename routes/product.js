import express from 'express';
import Product from '../models/product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create Product
router.post('/', auth, async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    const product = new Product({ name, price, description, category });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Products
router.get('/', auth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Update Product
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;