const express = require('express');
const Workflow = require('../models/Workflow');
const Tool = require('../models/Tool');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all workflows/templates
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, websiteType } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (websiteType) {
      query.websiteType = websiteType;
    }
    
    const workflows = await Workflow.find(query).populate('steps.tools.toolId');
    res.json({
      success: true,
      count: workflows.length,
      data: workflows,
    });
  } catch (error) {
    console.error('Get workflows error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Generate workflow based on user preferences
router.post('/generate', async (req, res) => {
  try {
    const { websiteType, primaryGoal, budget, skillLevel, aiNeeds, timeline } = req.body;
    
    // Rule-based recommendation engine
    const workflow = await generateWorkflow({
      websiteType,
      primaryGoal,
      budget,
      skillLevel,
      aiNeeds,
      timeline,
    });
    
    res.json({
      success: true,
      data: workflow,
    });
  } catch (error) {
    console.error('Generate workflow error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get workflow by ID
router.get('/:id', async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id).populate('steps.tools.toolId');
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.json({
      success: true,
      data: workflow,
    });
  } catch (error) {
    console.error('Get workflow by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save workflow progress (protected route)
router.post('/:id/progress', auth, async (req, res) => {
  try {
    const { stepId, completed } = req.body;
    const workflowId = req.params.id;
    
    // Update user's saved workflows
    const user = req.user;
    let savedWorkflow = user.savedWorkflows.find(w => w.workflowId === workflowId);
    
    if (!savedWorkflow) {
      // Create new saved workflow
      const workflow = await Workflow.findById(workflowId);
      savedWorkflow = {
        workflowId,
        workflowName: workflow.name,
        progress: [],
      };
      user.savedWorkflows.push(savedWorkflow);
    }
    
    // Update step progress
    let stepProgress = savedWorkflow.progress.find(p => p.stepId === stepId);
    if (stepProgress) {
      stepProgress.completed = completed;
      stepProgress.completedAt = completed ? new Date() : null;
    } else {
      savedWorkflow.progress.push({
        stepId,
        completed,
        completedAt: completed ? new Date() : null,
      });
    }
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: savedWorkflow,
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new user workflow (protected route)
router.post('/user-workflow', auth, async (req, res) => {
  try {
    const { name, type, templateId, customSteps } = req.body;
    const user = req.user;
    
    // Create a new workflow entry for the user
    const newWorkflow = {
      id: Date.now().toString(), // Simple ID generation
      name: name || `${type} Project`,
      type,
      templateId,
      customSteps: customSteps || [],
      status: 'active',
      createdAt: new Date(),
      progress: 0,
      timeSpent: 0
    };
    
    // Add to user's workflows
    if (!user.workflows) {
      user.workflows = [];
    }
    user.workflows.push(newWorkflow);
    
    // Save user data
    await user.save();
    
    res.json({
      success: true,
      message: 'Workflow created successfully',
      data: newWorkflow
    });
  } catch (error) {
    console.error('Create user workflow error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's analytics data (protected route)
router.get('/analytics', auth, async (req, res) => {
  try {
    const user = req.user;
    console.log('Analytics request for user:', user.email);
    console.log('User savedWorkflows count:', user.savedWorkflows?.length || 0);
    console.log('User workflows count:', user.workflows?.length || 0);
    
    // Use savedWorkflows for consistency with dashboard
    if (!user.savedWorkflows) {
      user.savedWorkflows = [];
    }
    
    // Calculate analytics based on user's saved workflows
    const totalProjects = user.savedWorkflows.length;
    const completedProjects = user.savedWorkflows.filter(w => {
      if (!w.progress) return false;
      const totalSteps = w.progress.length;
      const completedSteps = w.progress.filter(step => step.completed).length;
      return totalSteps > 0 && completedSteps === totalSteps;
    }).length;
    const activeProjects = totalProjects - completedProjects;
    
    // Calculate time spent based on workflow creation times and progress
    const totalTimeSpent = user.savedWorkflows.reduce((sum, w) => {
      if (!w.progress || w.progress.length === 0) return sum;
      const completedSteps = w.progress.filter(step => step.completed).length;
      return sum + (completedSteps * 2); // Estimate 2 hours per step
    }, 0);
    
    const averageCompletionTime = completedProjects > 0 ? totalTimeSpent / completedProjects : 0;
    
    // Recent activity from saved workflows
    const recentActivity = user.savedWorkflows
      .slice(-5)
      .map(workflow => ({
        date: workflow.createdAt.toISOString().split('T')[0],
        action: `Started ${workflow.workflowName || 'Custom'} workflow`,
        project: workflow.workflowName || 'Unnamed Project',
        time: workflow.createdAt.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }))
      .reverse();
    
    // Project types analysis based on workflow names
    const projectTypes = {};
    user.savedWorkflows.forEach(workflow => {
      const type = workflow.workflowName ? workflow.workflowName.split(' ')[0] : 'Custom';
      if (!projectTypes[type]) {
        projectTypes[type] = { count: 0, totalTime: 0 };
      }
      projectTypes[type].count++;
      const estimatedTime = workflow.progress ? workflow.progress.filter(p => p.completed).length * 2 : 0;
      projectTypes[type].totalTime += estimatedTime;
    });
    
    const projectTypesArray = Object.keys(projectTypes).map(type => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count: projectTypes[type].count,
      avgTime: projectTypes[type].count > 0 ? Math.round(projectTypes[type].totalTime / projectTypes[type].count) : 0
    }));
    
    const analytics = {
      overview: {
        totalProjects,
        completedProjects,
        activeProjects,
        totalTimeSpent: Math.round(totalTimeSpent),
        averageCompletionTime: Math.round(averageCompletionTime),
        productivityScore: Math.min(85 + (completedProjects * 3), 100) // Dynamic score based on completion
      },
      projectTypes: projectTypesArray,
      recentActivity
    };
    
    console.log('Analytics data being sent:', analytics);
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear all user workflows (protected route)
router.delete('/clear-workflows', auth, async (req, res) => {
  try {
    const user = req.user;
    
    // Clear all workflows from both arrays for consistency
    user.workflows = [];
    user.savedWorkflows = [];
    
    // Save user data
    await user.save();
    
    res.json({
      success: true,
      message: 'All workflows cleared successfully'
    });
  } catch (error) {
    console.error('Clear workflows error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update workflow status (protected route)
router.put('/workflow/:id/status', auth, async (req, res) => {
  try {
    const { status, progress, timeSpent } = req.body;
    const workflowId = req.params.id;
    const user = req.user;
    
    const workflow = user.workflows.find(w => w.id === workflowId);
    
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    
    // Update workflow
    if (status !== undefined) workflow.status = status;
    if (progress !== undefined) workflow.progress = progress;
    if (timeSpent !== undefined) workflow.timeSpent = timeSpent;
    
    if (status === 'completed') {
      workflow.completedAt = new Date();
    }
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Workflow updated successfully',
      data: workflow
    });
  } catch (error) {
    console.error('Update workflow error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete individual workflow (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const workflowId = req.params.id;
    const user = req.user;
    
    // Find and remove the workflow
    const workflowIndex = user.workflows.findIndex(w => w.id === workflowId);
    
    if (workflowIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: 'Workflow not found' 
      });
    }
    
    // Remove the workflow
    user.workflows.splice(workflowIndex, 1);
    
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

// Rule-based workflow generation function
const generateWorkflow = async (preferences) => {
  const { websiteType, primaryGoal, budget, skillLevel, aiNeeds, timeline } = preferences;
  
  let workflow = {
    name: `Custom ${websiteType} Workflow`,
    description: `Tailored workflow for building a ${websiteType} focused on ${primaryGoal}`,
    category: websiteType.toLowerCase(),
    websiteType,
    difficulty: skillLevel === 'No Code' ? 'beginner' : skillLevel === 'Low Code' ? 'intermediate' : 'advanced',
    estimatedDuration: timeline,
    steps: [],
  };

  // Define step templates based on website type and preferences
  const stepTemplates = {
    'E-commerce Store': [
      {
        id: 'planning',
        title: 'Planning & Strategy',
        description: 'Define your product catalog, target audience, and business model',
        estimatedTime: '1-2 days',
        order: 1,
      },
      {
        id: 'design',
        title: 'Store Design & Layout',
        description: 'Create an attractive and user-friendly store design',
        estimatedTime: '2-3 days',
        order: 2,
      },
      {
        id: 'content',
        title: 'Product Content Creation',
        description: 'Generate compelling product descriptions and marketing copy',
        estimatedTime: '1-2 days',
        order: 3,
      },
      {
        id: 'images',
        title: 'Visual Content Creation',
        description: 'Create product images, banners, and marketing visuals',
        estimatedTime: '1-2 days',
        order: 4,
      },
      {
        id: 'development',
        title: 'Store Development',
        description: 'Build and configure your online store',
        estimatedTime: '3-5 days',
        order: 5,
      },
      {
        id: 'testing',
        title: 'Testing & Optimization',
        description: 'Test functionality and optimize for performance',
        estimatedTime: '1-2 days',
        order: 6,
      },
      {
        id: 'launch',
        title: 'Launch & Marketing',
        description: 'Deploy your store and implement marketing strategies',
        estimatedTime: '1-2 days',
        order: 7,
      },
    ],
    'Blog': [
      {
        id: 'planning',
        title: 'Content Strategy',
        description: 'Plan your blog topics, audience, and content calendar',
        estimatedTime: '1 day',
        order: 1,
      },
      {
        id: 'design',
        title: 'Blog Design',
        description: 'Create an engaging and readable blog design',
        estimatedTime: '1-2 days',
        order: 2,
      },
      {
        id: 'content',
        title: 'Content Creation',
        description: 'Write your first blog posts and create engaging content',
        estimatedTime: '2-3 days',
        order: 3,
      },
      {
        id: 'development',
        title: 'Blog Development',
        description: 'Set up your blog platform and customize features',
        estimatedTime: '1-2 days',
        order: 4,
      },
      {
        id: 'seo',
        title: 'SEO Optimization',
        description: 'Optimize your blog for search engines',
        estimatedTime: '1 day',
        order: 5,
      },
      {
        id: 'launch',
        title: 'Launch & Promotion',
        description: 'Publish your blog and promote it on social media',
        estimatedTime: '1 day',
        order: 6,
      },
    ],
    'Portfolio': [
      {
        id: 'planning',
        title: 'Portfolio Planning',
        description: 'Select your best work and plan your portfolio structure',
        estimatedTime: '1 day',
        order: 1,
      },
      {
        id: 'design',
        title: 'Design & Layout',
        description: 'Create a professional and visually appealing design',
        estimatedTime: '1-2 days',
        order: 2,
      },
      {
        id: 'content',
        title: 'Content Creation',
        description: 'Write compelling descriptions for your work and about section',
        estimatedTime: '1 day',
        order: 3,
      },
      {
        id: 'development',
        title: 'Portfolio Development',
        description: 'Build your portfolio website with interactive features',
        estimatedTime: '2-3 days',
        order: 4,
      },
      {
        id: 'optimization',
        title: 'Optimization',
        description: 'Optimize for speed, mobile, and SEO',
        estimatedTime: '1 day',
        order: 5,
      },
      {
        id: 'launch',
        title: 'Launch & Networking',
        description: 'Deploy your portfolio and share it professionally',
        estimatedTime: '1 day',
        order: 6,
      },
    ],
  };

  // Get appropriate steps for the website type
  const steps = stepTemplates[websiteType] || stepTemplates['Blog'];
  
  // Add tool recommendations to each step
  for (const step of steps) {
    const toolRecommendations = await getToolRecommendations(step.id, skillLevel, budget, aiNeeds);
    step.tools = toolRecommendations;
    workflow.steps.push(step);
  }

  // Populate the tool objects with actual tool data
  const populatedWorkflow = { ...workflow };
  for (let i = 0; i < populatedWorkflow.steps.length; i++) {
    const step = populatedWorkflow.steps[i];
    if (step.tools && step.tools.length > 0) {
      const populatedTools = [];
      for (const toolRec of step.tools) {
        try {
          const tool = await Tool.findById(toolRec.toolId);
          if (tool) {
            populatedTools.push({
              toolId: tool.toObject(),
              isPrimary: toolRec.isPrimary,
              reason: toolRec.reason
            });
          }
        } catch (error) {
          console.error('Error populating tool:', error);
        }
      }
      populatedWorkflow.steps[i].tools = populatedTools;
    }
  }

  return populatedWorkflow;
};

// Helper function to get tool recommendations based on step and preferences
const getToolRecommendations = async (stepId, skillLevel, budget, aiNeeds) => {
  const toolMap = {
    planning: ['design', 'content'],
    design: ['design', 'ai-builders'],
    content: ['content'],
    images: ['design'],
    development: ['development', 'ai-builders'],
    testing: ['testing'],
    seo: ['seo'],
    optimization: ['analytics', 'testing'],
    launch: ['hosting', 'marketing'],
  };

  const categories = toolMap[stepId] || ['development'];
  
  try {
    const tools = await Tool.find({
      category: { $in: categories },
      difficulty: skillLevel === 'No Code' ? 'beginner' : { $in: ['beginner', 'intermediate'] },
    }).limit(3);

    return tools.map(tool => ({
      toolId: tool._id,
      isPrimary: true,
      reason: `Recommended for ${stepId} based on your skill level and preferences`,
    }));
  } catch (error) {
    console.error('Error getting tool recommendations:', error);
    return [];
  }
};

module.exports = router;
