import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, ExternalLink, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toolsAPI } from '../services/api';
import api from '../services/api';
import { Tool, ToolCategory } from '../types';
import toast from 'react-hot-toast';

const Tools: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories: { value: ToolCategory | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'All Tools', icon: '🔧' },
    { value: 'ai-builders', label: 'AI Builders', icon: '🤖' },
    { value: 'design', label: 'Design', icon: '🎨' },
    { value: 'development', label: 'Development', icon: '💻' },
    { value: 'content', label: 'Content', icon: '✍️' },
    { value: 'marketing', label: 'Marketing', icon: '📈' },
    { value: 'hosting', label: 'Hosting', icon: '🌐' },
    { value: 'seo', label: 'SEO', icon: '🔍' },
    { value: 'analytics', label: 'Analytics', icon: '📊' },
    { value: 'testing', label: 'Testing', icon: '🧪' },
  ];

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    filterTools();
  }, [tools, searchTerm, selectedCategory, selectedDifficulty]);

  // Default tools data as fallback
  const defaultTools: Tool[] = [
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
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '3',
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
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '4',
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
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '5',
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
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '6',
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
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const fetchTools = async () => {
    try {
      setLoading(true);
      console.log('Fetching tools from API...'); // Debug log
      const response = await toolsAPI.getAll();
      console.log('API response:', response); // Debug log
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        console.log('Tools data:', response.data.data); // Debug log
        if (response.data.data.length > 0) {
          setTools(response.data.data);
        } else {
          // Try to initialize sample data
          console.log('No tools found, attempting to initialize sample data...');
          try {
            const initResponse = await api.post('/tools/init-sample-data');
            if (initResponse.data.success && initResponse.data.data) {
              setTools(initResponse.data.data);
              toast.success('Sample tools data initialized successfully!');
            } else {
              console.log('Sample data init failed, using default tools');
              setTools(defaultTools);
              toast('Using sample tools data. Connect to database for full content.', { 
                icon: 'ℹ️',
                duration: 4000
              });
            }
          } catch (initError) {
            console.log('Could not initialize sample data, using default tools');
            setTools(defaultTools);
            toast('Using sample tools data. Connect to database for full content.', { 
              icon: 'ℹ️',
              duration: 4000
            });
          }
        }
      } else {
        console.log('Invalid API response format, using default tools');
        setTools(defaultTools);
        toast('Using sample tools data. Connect to database for full content.', { 
          icon: 'ℹ️',
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
      console.log('API failed, using default tools');
      setTools(defaultTools);
      toast.error('Could not connect to database. Showing sample tools.');
    } finally {
      setLoading(false);
    }
  };

  const filterTools = () => {
    let filtered = tools;

    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(tool => tool.difficulty === selectedDifficulty);
    }

    setFilteredTools(filtered);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI tools...</p>
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
              AI Tools Directory
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Discover the best AI tools for building, designing, and optimizing your website. 
              From no-code solutions to advanced development tools.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Additional Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  aria-label="Filter by difficulty"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTools.length} of {tools.length} tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleToolClick(tool.url)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {tool.logo ? (
                      <img 
                        src={tool.logo} 
                        alt={tool.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tool.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">
                          {tool.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                </div>

                {tool.features && tool.features.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Zap className="w-3 h-3 text-primary-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {tool.features.length > 3 && (
                        <li className="text-xs text-gray-500">
                          +{tool.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {tool.tags.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{tool.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
