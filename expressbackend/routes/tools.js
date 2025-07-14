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

// Initialize sample tools if database is empty
router.post('/init-sample-data', async (req, res) => {
  try {
    const existingToolsCount = await Tool.countDocuments();
    
    if (existingToolsCount > 0) {
      return res.json({
        success: true,
        message: 'Tools already exist',
        count: existingToolsCount
      });
    }

    const sampleTools = [
      {
        name: 'Bolt.new',
        description: 'AI-powered full-stack web development in the browser. Build, edit, and deploy websites with AI assistance.',
        category: 'ai-builders',
        url: 'https://bolt.new',
        pricing: 'freemium',
        features: ['Full-stack development', 'AI code generation', 'Real-time preview', 'Deployment'],
        rating: 4.8,
        tags: ['ai', 'full-stack', 'no-code', 'deployment'],
        difficulty: 'beginner',
        useCases: ['Complete website development', 'Rapid prototyping', 'AI-assisted coding'],
        isActive: true
      },
      {
        name: 'Lovable.dev',
        description: 'AI-powered web app builder that creates production-ready applications from natural language descriptions.',
        category: 'ai-builders',
        url: 'https://lovable.dev',
        pricing: 'freemium',
        features: ['Natural language to code', 'React applications', 'Production ready', 'Real-time collaboration'],
        rating: 4.7,
        tags: ['ai', 'react', 'natural-language', 'web-apps'],
        difficulty: 'beginner',
        useCases: ['Web app development', 'MVP creation', 'Rapid development'],
        isActive: true
      },
      {
        name: 'Figma',
        description: 'Collaborative interface design tool with powerful design systems and prototyping capabilities.',
        category: 'design',
        url: 'https://figma.com',
        pricing: 'freemium',
        features: ['Interface design', 'Prototyping', 'Real-time collaboration', 'Design systems'],
        rating: 4.9,
        tags: ['design', 'ui-ux', 'collaboration', 'prototyping'],
        difficulty: 'intermediate',
        useCases: ['UI/UX design', 'Wireframing', 'Design collaboration'],
        isActive: true
      },
      {
        name: 'Vercel',
        description: 'Platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.',
        category: 'hosting',
        url: 'https://vercel.com',
        pricing: 'freemium',
        features: ['Static site hosting', 'Serverless functions', 'Edge network', 'Git integration'],
        rating: 4.8,
        tags: ['hosting', 'deployment', 'serverless', 'static-sites'],
        difficulty: 'beginner',
        useCases: ['Website hosting', 'Static site deployment', 'Serverless functions'],
        isActive: true
      },
      {
        name: 'GitHub Copilot',
        description: 'AI pair programmer that helps you write code faster and with less work.',
        category: 'development',
        url: 'https://github.com/features/copilot',
        pricing: 'paid',
        features: ['AI code suggestions', 'Multiple languages', 'Context-aware', 'IDE integration'],
        rating: 4.6,
        tags: ['ai', 'coding', 'assistant', 'productivity'],
        difficulty: 'intermediate',
        useCases: ['Code assistance', 'Productivity boost', 'Learning coding patterns'],
        isActive: true
      },
      {
        name: 'ChatGPT',
        description: 'AI assistant for content creation, coding help, and general assistance with various tasks.',
        category: 'content',
        url: 'https://chat.openai.com',
        pricing: 'freemium',
        features: ['Text generation', 'Code assistance', 'Multiple languages', 'Conversation'],
        rating: 4.7,
        tags: ['ai', 'content', 'assistant', 'writing'],
        difficulty: 'beginner',
        useCases: ['Content writing', 'Code help', 'Research assistance'],
        isActive: true
      }
    ];

    const createdTools = await Tool.insertMany(sampleTools);
    
    res.json({
      success: true,
      message: 'Sample tools created successfully',
      count: createdTools.length,
      data: createdTools
    });
  } catch (error) {
    console.error('Initialize sample data error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
