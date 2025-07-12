const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's saved workflows (protected route)
router.get('/workflows', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('savedWorkflows');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('GET /users/workflows - User:', user.email || req.userId);
    console.log('GET /users/workflows - Saved workflows count:', user.savedWorkflows?.length || 0);
    
    res.json({
      success: true,
      data: user.savedWorkflows,
    });
  } catch (error) {
    console.error('Get user workflows error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save workflow to user's dashboard (protected route)
router.post('/workflows', auth, async (req, res) => {
  try {
    console.log('Save workflow request received:', req.body);
    console.log('User ID:', req.userId);
    
    const { workflowId, name, description, progress } = req.body;
    
    if (!workflowId || !name) {
      return res.status(400).json({ 
        success: false,
        message: 'Workflow ID and name are required' 
      });
    }
    
    const user = await User.findById(req.userId);
    if (!user) {
      console.log('User not found:', req.userId);
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    console.log('User found:', user.email);

    // Check if workflow already exists in user's saved workflows
    const existingWorkflowIndex = user.savedWorkflows.findIndex(
      w => w.workflowId === workflowId
    );

    const workflowData = {
      workflowId,
      workflowName: name,
      progress: progress || [],
      savedAt: new Date()
    };

    if (existingWorkflowIndex >= 0) {
      // Update existing workflow
      user.savedWorkflows[existingWorkflowIndex] = workflowData;
      console.log('Updated existing workflow');
    } else {
      // Add new workflow
      user.savedWorkflows.push(workflowData);
      console.log('Added new workflow');
    }

    await user.save();
    console.log('Workflow saved successfully');

    res.json({
      success: true,
      message: 'Workflow saved successfully',
      data: workflowData,
    });
  } catch (error) {
    console.error('Save workflow error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Update user profile (protected route)
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, bio, company, website } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ 
        success: false,
        message: 'Name and email are required' 
      });
    }
    
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email.toLowerCase(), 
      _id: { $ne: req.userId } 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email is already taken by another user' 
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { 
        name: name.trim(), 
        email: email.toLowerCase().trim(),
        bio: bio || '',
        company: company || '',
        website: website || ''
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: messages.join(', ') 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Delete user account (protected route)
router.delete('/account', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Account deactivated successfully',
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete individual saved workflow (protected route)
router.delete('/workflows/:workflowId', auth, async (req, res) => {
  try {
    const { workflowId } = req.params;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    // Find and remove the workflow from savedWorkflows
    const workflowIndex = user.savedWorkflows.findIndex(w => w.workflowId === workflowId);
    
    if (workflowIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: 'Workflow not found' 
      });
    }
    
    // Remove the workflow
    user.savedWorkflows.splice(workflowIndex, 1);
    
    // Save user data
    await user.save();
    
    res.json({
      success: true,
      message: 'Workflow deleted successfully'
    });
  } catch (error) {
    console.error('Delete workflow error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Clear all saved workflows (protected route)
router.delete('/workflows', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    // Clear all saved workflows
    user.savedWorkflows = [];
    
    // Save user data
    await user.save();
    
    res.json({
      success: true,
      message: 'All workflows cleared successfully'
    });
  } catch (error) {
    console.error('Clear workflows error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Debug: Get user info (protected route)
router.get('/debug', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        savedWorkflowsCount: user.savedWorkflows?.length || 0,
        workflowsCount: user.workflows?.length || 0,
        savedWorkflows: user.savedWorkflows || [],
        workflows: user.workflows || []
      }
    });
  } catch (error) {
    console.error('Debug user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
