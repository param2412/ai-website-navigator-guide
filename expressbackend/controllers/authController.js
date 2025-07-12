const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'ai-website-builder-secret-key', {
    expiresIn: '7d',
  });
};

const register = async (req, res) => {
  try {
    console.log('Registration attempt:', { 
      email: req.body.email, 
      name: req.body.name, 
      hasPassword: !!req.body.password 
    });

    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      console.log('Registration failed: Missing required fields');
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null,
          name: !name ? 'Name is required' : null
        }
      });
    }

    if (password.length < 6) {
      console.log('Registration failed: Password too short');
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    console.log('Checking for existing user with email:', email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Registration failed: User already exists');
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create new user
    console.log('Creating new user...');
    const user = new User({ email, password, name });
    await user.save();
    console.log('User created successfully:', user._id);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        bio: user.bio || '',
        company: user.company || '',
        website: user.website || '',
        preferences: user.preferences,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
    });
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Check for specific MongoDB errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    console.log('Login attempt:', { email: req.body.email });
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('Login failed: Missing credentials');
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Find user
    console.log('Finding user with email:', email);
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Check password
    console.log('Comparing password...');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: Password mismatch');
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user._id);
    console.log('Login successful for user:', user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        bio: user.bio,
        company: user.company,
        website: user.website,
        preferences: user.preferences,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const { websiteType, primaryGoal, budget, skillLevel, aiNeeds, timeline } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        preferences: {
          websiteType,
          primaryGoal,
          budget,
          skillLevel,
          aiNeeds,
          timeline,
        },
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Preferences updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Test endpoint for debugging
const testEndpoint = async (req, res) => {
  try {
    console.log('Test endpoint hit');
    res.json({ 
      success: true, 
      message: 'Backend is working',
      timestamp: new Date().toISOString(),
      dbConnected: mongoose.connection.readyState === 1
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ success: false, message: 'Test failed', error: error.message });
  }
};

module.exports = { register, login, getProfile, updatePreferences, testEndpoint };
