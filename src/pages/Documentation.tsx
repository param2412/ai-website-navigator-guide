import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Search, ArrowRight, FileText, Video, Code, ExternalLink, ChevronLeft, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Documentation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [selectedDocArticle, setSelectedDocArticle] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast.success(`Searching for: ${searchTerm}`);
      // In a real app, this would filter the documentation content
    }
  };

  const handleDocArticleClick = (articleId: string) => {
    setSelectedDocArticle(articleId);
  };

  const handleBackToDocList = () => {
    setSelectedDocArticle(null);
    // Smooth scroll to a reasonable position on the main documentation page
    setTimeout(() => {
      window.scrollTo({ 
        top: 200, 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    // Smooth scroll to a reasonable position on the main documentation page
    setTimeout(() => {
      window.scrollTo({ 
        top: 200, 
        behavior: 'smooth' 
      });
    }, 100);
  };

  // Add scroll effect when article is selected
  useEffect(() => {
    if (selectedDocArticle || selectedArticle) {
      // Small delay to allow the content to render first
      const timer = setTimeout(() => {
        // Scroll to a position that shows the article header nicely
        const headerOffset = 100;
        window.scrollTo({ 
          top: headerOffset, 
          behavior: 'smooth' 
        });
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [selectedDocArticle, selectedArticle]);
  const sections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using AI Website Builder Assistant',
      icon: Book,
      articles: [
        { 
          id: 'quick-start', 
          title: 'Quick Start Guide', 
          content: `
            <h2>Quick Start Guide</h2>
            <p>Get up and running with AI Website Builder Assistant in just a few minutes.</p>
            <h3>Step 1: Create Your Account</h3>
            <p>Sign up for a free account to access all features and start building your website.</p>
            <h3>Step 2: Choose a Template</h3>
            <p>Browse our collection of AI-optimized templates or let our AI suggest the perfect one for your needs.</p>
            <h3>Step 3: Customize Your Design</h3>
            <p>Use our intuitive editor to personalize colors, fonts, layouts, and content.</p>
            <h3>Step 4: Publish Your Site</h3>
            <p>Launch your website with one click and start reaching your audience.</p>
          `
        },
        { 
          id: 'ai-tools', 
          title: 'Understanding AI Tools', 
          
          content: `
            <h2>Understanding AI Tools</h2>
            <p>Learn how our AI tools can accelerate your website development process.</p>
            <h3>Content Generation</h3>
            <p>AI-powered content creation helps you write compelling copy, product descriptions, and blog posts.</p>
            <h3>Design Assistance</h3>
            <p>Get intelligent design suggestions based on your industry and brand preferences.</p>
            <h3>SEO Optimization</h3>
            <p>Automatically optimize your website for search engines with AI-driven SEO recommendations.</p>
          `
        },
        { 
          id: 'first-workflow', 
          title: 'Your First Workflow', 
          
          content: `
            <h2>Your First Workflow</h2>
            <p>Create your first automated workflow to streamline your website management.</p>
            <h3>What is a Workflow?</h3>
            <p>Workflows are automated sequences of tasks that help you manage repetitive processes efficiently.</p>
            <h3>Creating a Simple Workflow</h3>
            <p>Start with basic workflows like automated backups, content updates, or social media posting.</p>
            <h3>Monitoring Progress</h3>
            <p>Track your workflow's performance and make adjustments as needed.</p>
          `
        },
        { 
          id: 'account-setup', 
          title: 'Account Setup', 
          
          content: `
            <h2>Account Setup</h2>
            <p>Complete your account configuration for the best experience.</p>
            <h3>Profile Information</h3>
            <p>Add your personal and business details to personalize your experience.</p>
            <h3>Preferences</h3>
            <p>Set your communication preferences and notification settings.</p>
            <h3>Billing Setup</h3>
            <p>Configure your payment method for premium features and services.</p>
          `
        },
      ]
    },
    {
      title: 'Workflows',
      description: 'Master the art of creating and managing workflows',
      icon: FileText,
      articles: [
        { 
          id: 'workflow-basics', 
          title: 'Workflow Basics', 
          
          content: `
            <h2>Workflow Basics</h2>
            <p>Master the fundamentals of workflow creation and management.</p>
            <h3>Understanding Workflow Components</h3>
            <p>Learn about triggers, actions, conditions, and outputs that make up a workflow.</p>
            <h3>Workflow Types</h3>
            <p>Explore different types of workflows including content publishing, maintenance, and marketing automation.</p>
          `
        },
        { 
          id: 'custom-workflows', 
          title: 'Custom Workflows', 
          
          content: `
            <h2>Custom Workflows</h2>
            <p>Create sophisticated workflows tailored to your specific needs.</p>
            <h3>Advanced Configuration</h3>
            <p>Use conditional logic, loops, and variables to create complex automation sequences.</p>
            <h3>Integration Points</h3>
            <p>Connect your workflows with external services and APIs for enhanced functionality.</p>
          `
        },
        { 
          id: 'templates', 
          title: 'Workflow Templates', 
          
          content: `
            <h2>Workflow Templates</h2>
            <p>Use pre-built templates to quickly implement common workflow patterns.</p>
            <h3>Popular Templates</h3>
            <p>Explore our collection of proven workflow templates for various use cases.</p>
            <h3>Customizing Templates</h3>
            <p>Learn how to modify templates to fit your specific requirements.</p>
          `
        },
        { 
          id: 'progress', 
          title: 'Progress Tracking', 
          
          content: `
            <h2>Progress Tracking</h2>
            <p>Monitor and analyze your workflow performance.</p>
            <h3>Analytics Dashboard</h3>
            <p>Use the built-in analytics to track workflow execution and success rates.</p>
            <h3>Optimization Tips</h3>
            <p>Learn how to optimize your workflows for better performance and reliability.</p>
          `
        },
      ]
    },
    {
      title: 'AI Tools',
      description: 'Comprehensive guide to AI tools and integrations',
      icon: Code,
      articles: [
        { 
          id: 'categories', 
          title: 'Tool Categories', 
          
          content: `
            <h2>Tool Categories</h2>
            <p>Understand the different categories of AI tools available.</p>
            <h3>Content Tools</h3>
            <p>AI-powered writing, editing, and content optimization tools.</p>
            <h3>Design Tools</h3>
            <p>Automated design generation and optimization tools.</p>
            <h3>Marketing Tools</h3>
            <p>AI-driven marketing automation and analytics tools.</p>
          `
        },
        { 
          id: 'recommendations', 
          title: 'Tool Recommendations', 
          
          content: `
            <h2>Tool Recommendations</h2>
            <p>Get personalized AI tool recommendations based on your project needs.</p>
            <h3>Assessment Process</h3>
            <p>Our AI analyzes your requirements to suggest the most suitable tools.</p>
            <h3>Implementation Guide</h3>
            <p>Step-by-step instructions for implementing recommended tools in your workflow.</p>
          `
        },
        { 
          id: 'integrations', 
          title: 'Integration Guide', 
          
          content: `
            <h2>Integration Guide</h2>
            <p>Learn how to integrate AI tools with your existing workflow.</p>
            <h3>API Connections</h3>
            <p>Connect external tools through APIs for seamless automation.</p>
            <h3>Data Flow Management</h3>
            <p>Manage data flow between different tools and services.</p>
          `
        },
        { 
          id: 'comparison', 
          title: 'Tool Comparison', 
          
          content: `
            <h2>Tool Comparison</h2>
            <p>Compare different AI tools to make informed decisions.</p>
            <h3>Feature Comparison</h3>
            <p>Side-by-side comparison of features, pricing, and capabilities.</p>
            <h3>Use Case Analysis</h3>
            <p>Understand which tools work best for specific use cases and scenarios.</p>
          `
        },
      ]
    },
    {
      title: 'Advanced Features',
      description: 'Unlock the full potential of the platform',
      icon: Video,
      articles: [
        { 
          id: 'api', 
          title: 'API Documentation', 
          
          content: `
            <h2>API Documentation</h2>
            <p>Complete guide to using our API for custom integrations.</p>
            <h3>Authentication</h3>
            <p>Learn how to authenticate and secure your API connections.</p>
            <h3>Endpoints</h3>
            <p>Comprehensive documentation of all available API endpoints.</p>
            <h3>Examples</h3>
            <p>Real-world examples and code snippets for common API use cases.</p>
          `
        },
        { 
          id: 'custom-integrations', 
          title: 'Custom Integrations', 
          
          content: `
            <h2>Custom Integrations</h2>
            <p>Build custom integrations to extend platform functionality.</p>
            <h3>Webhook Setup</h3>
            <p>Configure webhooks to receive real-time updates and trigger actions.</p>
            <h3>Custom Connectors</h3>
            <p>Create custom connectors for proprietary or specialized tools.</p>
          `
        },
        { 
          id: 'automation', 
          title: 'Automation', 
          
          content: `
            <h2>Automation</h2>
            <p>Advanced automation techniques for power users.</p>
            <h3>Complex Workflows</h3>
            <p>Design sophisticated automation workflows with multiple conditions and branches.</p>
            <h3>Error Handling</h3>
            <p>Implement robust error handling and recovery mechanisms.</p>
          `
        },
        { 
          id: 'analytics', 
          title: 'Analytics & Reporting', 
          
          content: `
            <h2>Analytics & Reporting</h2>
            <p>Advanced analytics and custom reporting features.</p>
            <h3>Custom Dashboards</h3>
            <p>Create personalized dashboards with the metrics that matter to you.</p>
            <h3>Data Export</h3>
            <p>Export your data for external analysis and reporting.</p>
          `
        },
      ]
    }
  ];

  const popularArticles = [
    { 
      id: 'getting-started',
      title: 'Getting Started: Your First AI-Powered Website', 
      views: '7.1k', 
      
      content: `
        <h2>Getting Started: Your First AI-Powered Website</h2>
        <p>Welcome to AI Website Builder Assistant! This comprehensive guide will walk you through creating your first AI-powered website from start to finish.</p>
        
        <h3>Step 1: Setting Up Your Account</h3>
        <p>Begin by creating your account and completing the initial setup process. This includes verifying your email and setting your preferences.</p>
        
        <h3>Step 2: Choosing Your Website Type</h3>
        <p>Our AI will help you select the perfect website template based on your industry, goals, and target audience. Answer a few simple questions to get personalized recommendations.</p>
        
        <h3>Step 3: Customizing Your Design</h3>
        <p>Use our intuitive drag-and-drop editor powered by AI suggestions to customize your website's appearance, layout, and content.</p>
        
        <h3>Step 4: Adding Content</h3>
        <p>Let our AI content generator help you create compelling copy, or upload your own content. Our system will optimize it for SEO and user engagement.</p>
        
        <h3>Step 5: Publishing Your Site</h3>
        <p>Once you're satisfied with your website, publish it with one click. Our platform handles hosting, security, and performance optimization automatically.</p>
        
        <h3>Next Steps</h3>
        <p>After publishing, explore advanced features like analytics, e-commerce integration, and automated content updates to maximize your website's potential.</p>
      `
    },
    { 
      id: 'tool-selection',
      title: 'AI Tool Selection Guide: Choosing the Right Tools', 
      views: '5.9k', 
      
      content: `
        <h2>AI Tool Selection Guide: Choosing the Right Tools</h2>
        <p>With hundreds of AI tools available, selecting the right ones for your website project can be overwhelming. This guide will help you make informed decisions.</p>
        
        <h3>Understanding Tool Categories</h3>
        <p>AI tools are typically categorized into:</p>
        <ul>
          <li>Content Generation (GPT-4, Claude, Jasper)</li>
          <li>Design Assistance (Midjourney, DALL-E, Figma AI)</li>
          <li>SEO Optimization (Surfer SEO, MarketMuse)</li>
          <li>Analytics (Google Analytics 4, Hotjar)</li>
          <li>Customer Support (Intercom, Zendesk AI)</li>
        </ul>
        
        <h3>Evaluation Criteria</h3>
        <p>When selecting tools, consider:</p>
        <ul>
          <li>Integration capabilities with your existing stack</li>
          <li>Pricing and scalability</li>
          <li>Learning curve and user experience</li>
          <li>Community support and documentation</li>
          <li>Performance and reliability</li>
        </ul>
        
        <h3>Recommended Tool Combinations</h3>
        <p>For most websites, we recommend starting with these essential tools and expanding based on your specific needs.</p>
      `
    },
    { 
      id: 'ecommerce-setup',
      title: 'Complete E-commerce Setup with AI Assistance', 
      views: '5.6k', 
      
      content: `
        <h2>Complete E-commerce Setup with AI Assistance</h2>
        <p>Setting up an e-commerce website has never been easier thanks to AI-powered tools. This comprehensive guide covers everything from product catalogs to payment processing.</p>
        
        <h3>Planning Your E-commerce Strategy</h3>
        <p>Before diving into setup, define your business model, target audience, and product strategy. Our AI assistant can help analyze market trends and competitor strategies.</p>
        
        <h3>Product Catalog Management</h3>
        <p>Use AI tools to:</p>
        <ul>
          <li>Generate product descriptions</li>
          <li>Optimize product images</li>
          <li>Set competitive pricing</li>
          <li>Manage inventory levels</li>
        </ul>
        
        <h3>Payment and Shipping Setup</h3>
        <p>Configure secure payment gateways and shipping options with AI-powered fraud detection and shipping optimization.</p>
        
        <h3>Marketing Automation</h3>
        <p>Implement AI-driven marketing campaigns, email automation, and customer segmentation to boost sales and retention.</p>
        
        <h3>Performance Monitoring</h3>
        <p>Use analytics tools to track conversion rates, customer behavior, and sales performance with actionable AI insights.</p>
      `
    },
    { 
      id: 'seo-optimization',
      title: 'SEO Optimization Using AI-Powered Tools', 
      views: '648', 
      
      content: `
        <h2>SEO Optimization Using AI-Powered Tools</h2>
        <p>Modern SEO goes beyond keywords. Learn how to leverage AI tools for comprehensive search engine optimization that drives organic traffic.</p>
        
        <h3>AI-Powered Keyword Research</h3>
        <p>Use tools like Ahrefs, SEMrush, and our built-in AI to discover high-value keywords, analyze search intent, and identify content gaps.</p>
        
        <h3>Content Optimization</h3>
        <p>AI can help you:</p>
        <ul>
          <li>Write SEO-friendly content</li>
          <li>Optimize meta descriptions and titles</li>
          <li>Improve content readability</li>
          <li>Generate schema markup</li>
        </ul>
        
        <h3>Technical SEO</h3>
        <p>Automate technical SEO tasks including site speed optimization, mobile responsiveness testing, and crawl error detection.</p>
        
        <h3>Link Building Strategies</h3>
        <p>Use AI to identify link building opportunities, create outreach campaigns, and monitor your backlink profile.</p>
        
        <h3>Performance Tracking</h3>
        <p>Monitor your SEO progress with AI-powered analytics that provide actionable insights and recommendations for improvement.</p>
      `
    },
    { 
      id: 'custom-workflows',
      title: 'Custom Workflow Creation and Management', 
      views: '3.1k', 
      
      content: `
        <h2>Custom Workflow Creation and Management</h2>
        <p>Create powerful, automated workflows that streamline your website building process and improve efficiency.</p>
        
        <h3>Understanding Workflows</h3>
        <p>Workflows are sequences of automated tasks that help you manage repetitive processes, from content creation to site maintenance.</p>
        
        <h3>Building Your First Workflow</h3>
        <p>Start with simple workflows like:</p>
        <ul>
          <li>Automated content publishing</li>
          <li>Social media post scheduling</li>
          <li>Email campaign triggers</li>
          <li>Backup and maintenance tasks</li>
        </ul>
        
        <h3>Advanced Workflow Features</h3>
        <p>As you become more comfortable, explore conditional logic, API integrations, and multi-step processes.</p>
        
        <h3>Workflow Templates</h3>
        <p>Use our pre-built templates for common scenarios or create your own templates for recurring projects.</p>
        
        <h3>Monitoring and Optimization</h3>
        <p>Track workflow performance, identify bottlenecks, and continuously optimize for better results.</p>
      `
    },
    { 
      id: 'troubleshooting',
      title: 'Troubleshooting Common AI Website Issues', 
      views: '879', 
      
      content: `
        <h2>Troubleshooting Common AI Website Issues</h2>
        <p>Even with AI assistance, you might encounter challenges. This guide covers the most common issues and their solutions.</p>
        
        <h3>Performance Issues</h3>
        <p>Common performance problems include slow loading times, unoptimized images, and inefficient code. Learn how to identify and fix these issues.</p>
        
        <h3>Content Generation Problems</h3>
        <p>Sometimes AI-generated content may not meet your expectations. Discover techniques for better prompting and content refinement.</p>
        
        <h3>Integration Conflicts</h3>
        <p>When multiple tools don't work well together, follow our systematic approach to identify and resolve conflicts.</p>
        
        <h3>SEO and Visibility Issues</h3>
        <p>If your site isn't ranking or being found, review these common SEO mistakes and how to fix them.</p>
        
        <h3>Getting Help</h3>
        <p>When you need additional support, use our ticketing system, community forums, or schedule a consultation with our experts.</p>
      `
    },
  ];

  const handleArticleClick = (articleId: string) => {
    setSelectedArticle(articleId);
  };

  const selectedArticleData = popularArticles.find(article => article.id === selectedArticle);
  
  // Find documentation article from all sections
  const selectedDocArticleData = sections
    .flatMap(section => section.articles)
    .find(article => article.id === selectedDocArticle);

  // If a documentation article is selected, show it
  if (selectedDocArticle && selectedDocArticleData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleBackToDocList}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Documentation
          </motion.button>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {selectedDocArticleData.title}
            </h1>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedDocArticleData.content }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // If a popular article is selected, show it
  if (selectedArticle && selectedArticleData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleBackToList}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Documentation
          </motion.button>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Eye className="w-4 h-4 mr-2" />
              <span>{selectedArticleData.views} views</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {selectedArticleData.title}
            </h1>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedArticleData.content }}
            />
          </motion.div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {popularArticles
                .filter(article => article.id !== selectedArticle)
                .slice(0, 4)
                .map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleArticleClick(article.id)}
                    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 mr-2" />
                      <span>{article.views} views</span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              Everything you need to know about building websites with AI assistance
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:bg-gray-50"
              >
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <span>{article.views} views</span>
                </div>
                <div className="mt-3 flex items-center text-primary-600 text-sm font-medium">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {section.articles.map((article, articleIndex) => (
                  <div
                    key={articleIndex}
                    onClick={() => handleDocArticleClick(article.id)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-900 font-medium">{article.title}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Need Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-100 mb-6">
            Our support team is here to help you get the most out of AI Website Builder Assistant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/support"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              Contact Support
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;
