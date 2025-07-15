const express = require('express');
const Tool = require('../models/Tool');

const router = express.Router();

// Fallback tools data function
function getFallbackTools() {
  return [
    // AI Website Builders
    {
      _id: '1',
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
      _id: '2',
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
      _id: '3',
      name: 'Replit',
      description: 'Online IDE and hosting platform with AI coding assistance for collaborative development.',
      category: 'development',
      url: 'https://replit.com',
      pricing: 'freemium',
      features: ['Online IDE', 'AI assistance', 'Real-time collaboration', 'Instant hosting'],
      rating: 4.6,
      tags: ['ide', 'collaboration', 'hosting', 'ai-assistant'],
      difficulty: 'intermediate',
      useCases: ['Code development', 'Team collaboration', 'Learning programming'],
      isActive: true
    },
    
    // Design AI Tools
    {
      _id: '4',
      name: 'Midjourney',
      description: 'AI image generator that creates stunning visuals from text descriptions.',
      category: 'design',
      url: 'https://midjourney.com',
      pricing: 'paid',
      features: ['Text-to-image', 'High quality output', 'Style variations', 'Commercial use'],
      rating: 4.9,
      tags: ['ai', 'image-generation', 'art', 'design'],
      difficulty: 'beginner',
      useCases: ['Website imagery', 'Marketing visuals', 'Product mockups'],
      isActive: true
    },
    {
      _id: '5',
      name: 'DALL-E 3',
      description: 'OpenAI\'s advanced AI image generator with exceptional prompt understanding.',
      category: 'design',
      url: 'https://openai.com/dall-e-3',
      pricing: 'paid',
      features: ['Advanced text understanding', 'High resolution', 'Style control', 'Safe generation'],
      rating: 4.8,
      tags: ['ai', 'openai', 'image-generation', 'creative'],
      difficulty: 'beginner',
      useCases: ['Custom illustrations', 'Brand imagery', 'Content creation'],
      isActive: true
    },
    {
      _id: '6',
      name: 'Figma',
      description: 'Collaborative design tool with AI features for UI/UX design and prototyping.',
      category: 'design',
      url: 'https://figma.com',
      pricing: 'freemium',
      features: ['UI/UX design', 'Real-time collaboration', 'Prototyping', 'Design systems'],
      rating: 4.8,
      tags: ['ui-design', 'collaboration', 'prototyping', 'design-system'],
      difficulty: 'intermediate',
      useCases: ['Website design', 'App design', 'Design systems'],
      isActive: true
    },
    {
      _id: '7',
      name: 'Canva',
      description: 'AI-powered design platform for creating graphics, presentations, and marketing materials.',
      category: 'design',
      url: 'https://canva.com',
      pricing: 'freemium',
      features: ['Template library', 'AI design assistant', 'Brand kit', 'Social media templates'],
      rating: 4.7,
      tags: ['templates', 'ai-design', 'marketing', 'social-media'],
      difficulty: 'beginner',
      useCases: ['Marketing materials', 'Social media graphics', 'Presentations'],
      isActive: true
    },

    // Content AI Tools
    {
      _id: '8',
      name: 'ChatGPT',
      description: 'Advanced AI assistant for content creation, copywriting, and creative writing.',
      category: 'content',
      url: 'https://chat.openai.com',
      pricing: 'freemium',
      features: ['Content generation', 'Multiple languages', 'Creative writing', 'Technical writing'],
      rating: 4.8,
      tags: ['ai', 'content', 'writing', 'copywriting'],
      difficulty: 'beginner',
      useCases: ['Website copy', 'Blog posts', 'Product descriptions'],
      isActive: true
    },
    {
      _id: '9',
      name: 'Claude',
      description: 'AI assistant specialized in helpful, harmless, and honest content creation.',
      category: 'content',
      url: 'https://claude.ai',
      pricing: 'freemium',
      features: ['Long-form content', 'Analysis', 'Coding assistance', 'Research'],
      rating: 4.7,
      tags: ['ai', 'analysis', 'long-form', 'research'],
      difficulty: 'beginner',
      useCases: ['Research content', 'Technical documentation', 'Content analysis'],
      isActive: true
    },
    {
      _id: '10',
      name: 'Copy.ai',
      description: 'AI copywriting tool for marketing copy, emails, and social media content.',
      category: 'content',
      url: 'https://copy.ai',
      pricing: 'freemium',
      features: ['Marketing copy', 'Email templates', 'Social media posts', 'Blog ideas'],
      rating: 4.5,
      tags: ['copywriting', 'marketing', 'email', 'social-media'],
      difficulty: 'beginner',
      useCases: ['Marketing campaigns', 'Email marketing', 'Social media'],
      isActive: true
    },

    // Development Tools
    {
      _id: '11',
      name: 'GitHub Copilot',
      description: 'AI-powered code completion tool that helps developers write code faster.',
      category: 'development',
      url: 'https://github.com/features/copilot',
      pricing: 'paid',
      features: ['Code completion', 'Multiple languages', 'Context awareness', 'IDE integration'],
      rating: 4.6,
      tags: ['coding', 'ai-assistant', 'productivity', 'github'],
      difficulty: 'intermediate',
      useCases: ['Code development', 'Learning programming', 'Productivity'],
      isActive: true
    },
    {
      _id: '12',
      name: 'Cursor',
      description: 'AI-first code editor built for pair programming with AI.',
      category: 'development',
      url: 'https://cursor.sh',
      pricing: 'freemium',
      features: ['AI pair programming', 'Code explanation', 'Refactoring', 'VS Code compatibility'],
      rating: 4.7,
      tags: ['code-editor', 'ai-pair-programming', 'productivity'],
      difficulty: 'intermediate',
      useCases: ['AI-assisted coding', 'Code refactoring', 'Learning'],
      isActive: true
    },

    // Hosting Platforms
    {
      _id: '13',
      name: 'Vercel',
      description: 'Frontend cloud platform for static sites and serverless functions with excellent performance.',
      category: 'hosting',
      url: 'https://vercel.com',
      pricing: 'freemium',
      features: ['Static hosting', 'Serverless functions', 'Global CDN', 'Git integration'],
      rating: 4.8,
      tags: ['hosting', 'static-sites', 'serverless', 'performance'],
      difficulty: 'beginner',
      useCases: ['Website hosting', 'Static sites', 'JAMstack applications'],
      isActive: true
    },
    {
      _id: '14',
      name: 'Netlify',
      description: 'All-in-one platform for automating modern web projects with continuous deployment.',
      category: 'hosting',
      url: 'https://netlify.com',
      pricing: 'freemium',
      features: ['Continuous deployment', 'Form handling', 'Identity management', 'Edge functions'],
      rating: 4.7,
      tags: ['hosting', 'continuous-deployment', 'jamstack', 'forms'],
      difficulty: 'beginner',
      useCases: ['Static site hosting', 'JAMstack apps', 'Form handling'],
      isActive: true
    },

    // Marketing AI Tools
    {
      _id: '15',
      name: 'Jasper',
      description: 'AI content platform for enterprise marketing teams to create on-brand content.',
      category: 'marketing',
      url: 'https://jasper.ai',
      pricing: 'paid',
      features: ['Brand voice', 'Content calendar', 'Team collaboration', 'Enterprise features'],
      rating: 4.5,
      tags: ['enterprise', 'brand-voice', 'content-marketing', 'team'],
      difficulty: 'intermediate',
      useCases: ['Enterprise content', 'Brand marketing', 'Content strategy'],
      isActive: true
    },
    {
      _id: '16',
      name: 'HubSpot',
      description: 'All-in-one marketing, sales, and service platform with AI-powered features.',
      category: 'marketing',
      url: 'https://hubspot.com',
      pricing: 'freemium',
      features: ['CRM', 'Email marketing', 'Landing pages', 'Analytics'],
      rating: 4.6,
      tags: ['crm', 'email-marketing', 'analytics', 'all-in-one'],
      difficulty: 'intermediate',
      useCases: ['Lead generation', 'Email campaigns', 'Customer management'],
      isActive: true
    },

    // SEO Tools
    {
      _id: '17',
      name: 'Surfer SEO',
      description: 'AI-powered SEO tool for content optimization and keyword research.',
      category: 'seo',
      url: 'https://surferseo.com',
      pricing: 'paid',
      features: ['Content optimization', 'Keyword research', 'SERP analysis', 'Content editor'],
      rating: 4.6,
      tags: ['seo', 'content-optimization', 'keywords', 'serp'],
      difficulty: 'intermediate',
      useCases: ['SEO optimization', 'Content strategy', 'Keyword research'],
      isActive: true
    },
    {
      _id: '18',
      name: 'SEMrush',
      description: 'Comprehensive SEO and digital marketing toolkit with AI insights.',
      category: 'seo',
      url: 'https://semrush.com',
      pricing: 'paid',
      features: ['SEO audit', 'Competitor analysis', 'Keyword tracking', 'Content gap analysis'],
      rating: 4.7,
      tags: ['seo', 'competitor-analysis', 'keywords', 'audit'],
      difficulty: 'advanced',
      useCases: ['SEO strategy', 'Competitor research', 'Performance tracking'],
      isActive: true
    },

    // Testing Tools
    {
      _id: '19',
      name: 'Playwright',
      description: 'Modern web testing framework with AI-powered test generation capabilities.',
      category: 'testing',
      url: 'https://playwright.dev',
      pricing: 'free',
      features: ['Cross-browser testing', 'Auto-wait', 'Test generation', 'Screenshots'],
      rating: 4.8,
      tags: ['testing', 'automation', 'cross-browser', 'ai-generated'],
      difficulty: 'advanced',
      useCases: ['E2E testing', 'Cross-browser testing', 'Test automation'],
      isActive: true
    },
    {
      _id: '20',
      name: 'TestCafe',
      description: 'Node.js tool to automate end-to-end web testing with AI assistance.',
      category: 'testing',
      url: 'https://testcafe.io',
      pricing: 'free',
      features: ['No WebDriver', 'Parallel testing', 'Live mode', 'Smart selectors'],
      rating: 4.5,
      tags: ['testing', 'nodejs', 'automation', 'parallel'],
      difficulty: 'intermediate',
      useCases: ['Automated testing', 'Quality assurance', 'Regression testing'],
      isActive: true
    },

    // Analytics Tools
    {
      _id: '21',
      name: 'Google Analytics 4',
      description: 'Advanced web analytics with AI-powered insights and predictive metrics.',
      category: 'analytics',
      url: 'https://analytics.google.com',
      pricing: 'free',
      features: ['AI insights', 'Predictive metrics', 'Cross-platform tracking', 'Custom reports'],
      rating: 4.4,
      tags: ['analytics', 'ai-insights', 'tracking', 'reports'],
      difficulty: 'intermediate',
      useCases: ['Website analytics', 'User behavior', 'Conversion tracking'],
      isActive: true
    },
    {
      _id: '22',
      name: 'Hotjar',
      description: 'Behavior analytics tool with heatmaps, recordings, and AI-powered insights.',
      category: 'analytics',
      url: 'https://hotjar.com',
      pricing: 'freemium',
      features: ['Heatmaps', 'Session recordings', 'Surveys', 'User feedback'],
      rating: 4.6,
      tags: ['heatmaps', 'user-behavior', 'recordings', 'feedback'],
      difficulty: 'beginner',
      useCases: ['User experience analysis', 'Conversion optimization', 'User feedback'],
      isActive: true
    }
  ];
}

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

    let tools = [];
    try {
      // Try to get from database first
      tools = await Tool.find(query).sort({ rating: -1, createdAt: -1 });
    } catch (dbError) {
      console.log('Database not available, using fallback data:', dbError.message);
      // Use fallback data when database is not available
      tools = getFallbackTools();
      
      // Apply filters to fallback data
      if (category && category !== 'all') {
        tools = tools.filter(tool => tool.category === category);
      }
      if (pricing && pricing !== 'all') {
        tools = tools.filter(tool => tool.pricing === pricing);
      }
      if (difficulty && difficulty !== 'all') {
        tools = tools.filter(tool => tool.difficulty === difficulty);
      }
      if (search) {
        const searchLower = search.toLowerCase();
        tools = tools.filter(tool =>
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
    }
    
    res.json({
      success: true,
      count: tools.length,
      data: tools,
    });
  } catch (error) {
    console.error('Get tools error:', error);
    // Return fallback data even on error
    const fallbackTools = getFallbackTools();
    res.json({
      success: true,
      count: fallbackTools.length,
      data: fallbackTools,
      message: 'Using fallback data'
    });
  }
});

// Get tool by ID
router.get('/:id', async (req, res) => {
  try {
    let tool;
    try {
      tool = await Tool.findById(req.params.id);
    } catch (dbError) {
      console.log('Database not available, searching fallback data');
      const fallbackTools = getFallbackTools();
      tool = fallbackTools.find(t => t._id === req.params.id);
    }
    
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
    let tools;
    
    try {
      tools = await Tool.find({ category, isActive: true }).sort({ rating: -1 });
    } catch (dbError) {
      console.log('Database not available, filtering fallback data');
      const fallbackTools = getFallbackTools();
      tools = fallbackTools.filter(tool => tool.category === category);
    }
    
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
    let existingToolsCount = 0;
    try {
      existingToolsCount = await Tool.countDocuments();
    } catch (dbError) {
      console.log('Database not available for init-sample-data');
      return res.json({
        success: true,
        message: 'Database not available, using fallback data',
        count: getFallbackTools().length,
        data: getFallbackTools()
      });
    }
    
    if (existingToolsCount > 0) {
      return res.json({
        success: true,
        message: 'Tools already exist',
        count: existingToolsCount
      });
    }

    const sampleTools = getFallbackTools();
    const createdTools = await Tool.insertMany(sampleTools);
    
    res.json({
      success: true,
      message: 'Sample tools created successfully',
      count: createdTools.length,
      data: createdTools
    });
  } catch (error) {
    console.error('Initialize sample data error:', error);
    res.json({
      success: true,
      message: 'Using fallback data due to database error',
      count: getFallbackTools().length,
      data: getFallbackTools()
    });
  }
});

module.exports = router;
