const mongoose = require('mongoose');
const Tool = require('./models/Tool');
const Workflow = require('./models/Workflow');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-website-builder');

const aiTools = [
  // AI Website Builders
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
  },
  {
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
  },
  
  // Design AI Tools
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },

  // Content AI Tools
  {
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
  },
  {
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
  },
  {
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
  },

  // Development Tools
  {
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
  },
  {
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
  },

  // Hosting Platforms
  {
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
  },
  {
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
  },

  // Marketing AI Tools
  {
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
  },
  {
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
  },

  // SEO Tools
  {
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
  },
  {
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
  },

  // Testing Tools
  {
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
  },
  {
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
  },

  // Analytics Tools
  {
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
  },
  {
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
  },
];

const templateWorkflows = [
  {
    name: 'E-commerce Quick Launch',
    description: 'Launch a professional e-commerce store in days with AI-powered tools',
    category: 'E-commerce Store',
    websiteType: 'E-commerce Store',
    difficulty: 'intermediate',
    estimatedDuration: '1-2 weeks',
    isTemplate: true,
    tags: ['e-commerce', 'online-store', 'quick-launch'],
    targetAudience: ['Small business owners', 'Entrepreneurs', 'Product sellers'],
    requirements: ['Product catalog', 'Business registration', 'Payment processing setup'],
  },
  {
    name: 'Personal Blog Starter',
    description: 'Create and launch a beautiful personal blog with AI-generated content',
    category: 'Blog',
    websiteType: 'Blog',
    difficulty: 'beginner',
    estimatedDuration: '3-5 days',
    isTemplate: true,
    tags: ['blog', 'personal', 'content-creation'],
    targetAudience: ['Writers', 'Content creators', 'Personal brands'],
    requirements: ['Content ideas', 'Personal branding materials'],
  },
  {
    name: 'Portfolio Showcase',
    description: 'Build a stunning portfolio website to showcase your work and skills',
    category: 'Portfolio',
    websiteType: 'Portfolio',
    difficulty: 'beginner',
    estimatedDuration: '2-4 days',
    isTemplate: true,
    tags: ['portfolio', 'showcase', 'professional'],
    targetAudience: ['Designers', 'Developers', 'Freelancers', 'Creative professionals'],
    requirements: ['Work samples', 'Professional photos', 'Contact information'],
  },
  {
    name: 'Business Landing Page',
    description: 'Create a high-converting landing page for your business or service',
    category: 'Landing Page',
    websiteType: 'Landing Page',
    difficulty: 'beginner',
    estimatedDuration: '1-2 days',
    isTemplate: true,
    tags: ['landing-page', 'business', 'conversion'],
    targetAudience: ['Business owners', 'Service providers', 'Startups'],
    requirements: ['Business description', 'Value proposition', 'Contact details'],
  },
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await Tool.deleteMany({});
    await Workflow.deleteMany({});
    
    // Insert AI tools
    console.log('📚 Inserting AI tools...');
    const insertedTools = await Tool.insertMany(aiTools);
    console.log(`✅ Inserted ${insertedTools.length} AI tools`);
    
    // Insert template workflows
    console.log('🔄 Inserting workflow templates...');
    const insertedWorkflows = await Workflow.insertMany(templateWorkflows);
    console.log(`✅ Inserted ${insertedWorkflows.length} workflow templates`);
    
    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
