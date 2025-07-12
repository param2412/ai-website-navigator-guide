const express = require('express');
const Tool = require('../models/Tool');

const router = express.Router();

// Get all tools
router.get('/', async (req, res) => {
  try {
    const { category, search, pricing, difficulty } = req.query;
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (pricing) {
      query.pricing = pricing;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    
    const tools = await Tool.find(query).sort({ rating: -1, createdAt: -1 });
    res.json({
      success: true,
      count: tools.length,
      data: tools,
    });
  } catch (error) {
    console.error('Get tools error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tool by ID
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json({
      success: true,
      data: tool,
    });
  } catch (error) {
    console.error('Get tool by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tools by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const tools = await Tool.find({ category, isActive: true }).sort({ rating: -1 });
    
    res.json({
      success: true,
      count: tools.length,
      data: tools,
    });
  } catch (error) {
    console.error('Get tools by category error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
