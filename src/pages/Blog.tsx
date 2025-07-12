import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag, Clock, Eye, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleReadMore = (postId: string) => {
    setSelectedPost(postId);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    // Smooth scroll to a reasonable position on the main blog page
    setTimeout(() => {
      window.scrollTo({ 
        top: 200, 
        behavior: 'smooth' 
      });
    }, 100);
  };

  // Add scroll effect when post is selected
  useEffect(() => {
    if (selectedPost) {
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
  }, [selectedPost]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API call to subscribe the user
      toast.success('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'ai-tools', label: 'AI Tools' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'case-studies', label: 'Case Studies' },
    { value: 'industry-news', label: 'Industry News' },
    { value: 'tips', label: 'Tips & Tricks' },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'ai-tools': 'bg-blue-100 text-blue-800',
      'tutorials': 'bg-green-100 text-green-800',
      'case-studies': 'bg-purple-100 text-purple-800',
      'industry-news': 'bg-orange-100 text-orange-800',
      'tips': 'bg-pink-100 text-pink-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const featuredPost = {
    id: 'future-ai-web-development',
    title: 'The Future of AI in Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the latest AI innovations transforming how we build websites, from automated design systems to intelligent content generation.',
    author: 'Sarah Chen',
    date: '2025-06-25',
    category: 'industry-news',
    readTime: '8 min read',
    views: '2.4k',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop',
    featured: true,
    content: `
      <h2>The Future of AI in Web Development: Trends to Watch in 2025</h2>
      <p>The web development landscape is experiencing a seismic shift as artificial intelligence becomes increasingly integrated into every aspect of the development process. From automated code generation to intelligent user experience optimization, AI is not just changing how we build websites—it's revolutionizing what's possible.</p>
      
      <h3>1. Automated Design Systems</h3>
      <p>AI-powered design systems are becoming sophisticated enough to create entire user interfaces based on simple prompts. These systems can analyze user behavior patterns, brand guidelines, and accessibility standards to generate designs that are both beautiful and functional.</p>
      
      <h3>2. Intelligent Content Generation</h3>
      <p>Gone are the days of spending hours crafting website copy. Modern AI tools can generate compelling, SEO-optimized content that resonates with your target audience while maintaining your brand voice.</p>
      
      <h3>3. Predictive User Experience</h3>
      <p>AI algorithms can now predict user behavior and dynamically adjust website layouts, content, and functionality in real-time to improve engagement and conversion rates.</p>
      
      <h3>4. Automated Testing and Optimization</h3>
      <p>AI-driven testing tools can automatically identify bugs, performance issues, and accessibility problems, making the quality assurance process more efficient and comprehensive.</p>
      
      <h3>5. Voice and Conversational Interfaces</h3>
      <p>As voice technology improves, websites are incorporating more conversational elements, from chatbots to voice-activated navigation, creating more interactive user experiences.</p>
      
      <h3>The Road Ahead</h3>
      <p>The integration of AI in web development is still in its early stages. As these technologies mature, we can expect even more revolutionary changes that will make web development more accessible, efficient, and powerful than ever before.</p>
    `
  };

  const blogPosts = [
    {
      id: 'beginner-guide-ai-website',
      title: 'Building Your First AI Website: Complete Beginner\'s Guide',
      excerpt: 'Step-by-step tutorial on creating a professional website using the latest AI tools and technologies.',
      author: 'Mike Johnson',
      date: '2025-06-28',
      category: 'tutorials',
      readTime: '15 min read',
      views: '8.4k',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      content: `
        <h2>Building Your First AI Website: Complete Beginner's Guide</h2>
        <p>Creating a website has never been more accessible thanks to AI-powered tools. This comprehensive guide will take you from concept to launch, even if you've never built a website before.</p>
        
        <h3>Getting Started: Choosing Your Platform</h3>
        <p>The first step is selecting the right AI website builder for your needs. Consider factors like your technical skill level, budget, and the type of website you want to create.</p>
        
        <h3>Planning Your Website Structure</h3>
        <p>Before diving into design, take time to plan your website's structure. AI tools can help analyze successful websites in your industry and suggest optimal layouts.</p>
        
        <h3>Designing with AI Assistance</h3>
        <p>Modern AI design tools can create stunning layouts based on your preferences. Learn how to effectively communicate your vision to AI and iterate on designs.</p>
        
        <h3>Content Creation Made Easy</h3>
        <p>Use AI content generators to create compelling copy, optimize for SEO, and ensure your message resonates with your target audience.</p>
        
        <h3>Launch and Beyond</h3>
        <p>Once your site is live, AI tools can help monitor performance, suggest improvements, and keep your content fresh and engaging.</p>
      `
    },
    {
      id: 'top-5-ai-website-builders',
      title: 'Top 5 AI Website Builders That Will Transform Your Business',
      excerpt: 'Comprehensive review of the best AI-powered website builders and how they can accelerate your development.',
      author: 'Emily Rodriguez',
      date: '2025-06-25',
      category: 'ai-tools',
      readTime: '12 min read',
      views: '6.2k',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=250&fit=crop',
      content: `
        <h2>Top 5 AI Website Builders That Will Transform Your Business</h2>
        <p>The market is flooded with AI website builders, each promising to revolutionize how you create websites. We've tested the top platforms to help you make an informed decision.</p>
        
        <h3>1. Wix ADI (Artificial Design Intelligence)</h3>
        <p>Wix's AI system creates personalized websites by asking simple questions about your business and preferences. Excellent for beginners who want professional results quickly.</p>
        
        <h3>2. Bookmark AIDA</h3>
        <p>AIDA (Artificial Intelligence Design Assistant) builds websites in under two minutes using machine learning algorithms trained on thousands of successful websites.</p>
        
        <h3>3. Zyro AI Website Builder</h3>
        <p>Offers AI-powered content generation, logo creation, and business name suggestions alongside its website building capabilities.</p>
        
        <h3>4. Jimdo Dolphin</h3>
        <p>Creates websites through a conversational interface, making it feel like you're chatting with a design expert rather than using software.</p>
        
        <h3>5. Firedrop</h3>
        <p>Uses AI chatbot Sacha to guide users through the website creation process, offering real-time suggestions and improvements.</p>
        
        <h3>Making Your Choice</h3>
        <p>Consider your specific needs, budget, and long-term goals when selecting an AI website builder. Each platform has unique strengths that may align better with your requirements.</p>
      `
    },
    {
      id: 'ecommerce-ai-success-story',
      title: 'Case Study: E-commerce Success with AI in 30 Days',
      excerpt: 'Real story of how a small business built a successful online store using AI tools in just one month.',
      author: 'Emily Rodriguez',
      date: '2025-06-18',
      category: 'case-studies',
      readTime: '6 min read',
      views: '1.2k',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      content: `
        <h2>Case Study: E-commerce Success with AI in 30 Days</h2>
        <p>Meet Sarah, a jewelry designer who transformed her hobby into a thriving online business using AI tools. Here's how she did it in just 30 days.</p>
        
        <h3>The Challenge</h3>
        <p>Sarah had beautiful jewelry designs but no technical skills to create an online store. She needed a professional e-commerce site quickly and affordably.</p>
        
        <h3>Week 1: Foundation Building</h3>
        <p>Using an AI website builder, Sarah created her store's basic structure. AI tools helped her choose colors, layouts, and organize her product categories effectively.</p>
        
        <h3>Week 2: Content and Product Setup</h3>
        <p>AI content generators helped create product descriptions, about pages, and policy content. AI image tools enhanced her product photos for better visual appeal.</p>
        
        <h3>Week 3: SEO and Marketing Setup</h3>
        <p>AI SEO tools optimized her site for search engines, while AI marketing assistants helped create social media content and email campaigns.</p>
        
        <h3>Week 4: Launch and Initial Sales</h3>
        <p>Sarah launched her store and made her first sales within days. AI analytics tools provided insights into customer behavior and conversion optimization.</p>
        
        <h3>Results After 30 Days</h3>
        <p>Sarah's store generated $5,000 in sales during its first month, with a professional appearance that competitors assumed took months to create.</p>
      `
    }
  ];

  const allPosts = [featuredPost, ...blogPosts];
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedPostData = allPosts.find(post => post.id === selectedPost);

  if (selectedPost && selectedPostData) {
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
            Back to Blog
          </motion.button>

          {/* Banner Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img
              src={selectedPostData.image}
              alt={selectedPostData.title}
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop`;
              }}
            />
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium mr-4 ${getCategoryColor(selectedPostData.category)}`}>
                {selectedPostData.category.replace('-', ' ')}
              </span>
              <Calendar className="w-4 h-4 mr-2" />
              <span className="mr-4">{new Date(selectedPostData.date).toLocaleDateString()}</span>
              <Clock className="w-4 h-4 mr-2" />
              <span className="mr-4">{selectedPostData.readTime}</span>
              <Eye className="w-4 h-4 mr-2" />
              <span>{selectedPostData.views} views</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedPostData.title}
            </h1>
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>By {selectedPostData.author}</span>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedPostData.content }}
            />
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(post => post.id !== selectedPost && post.category === selectedPostData.category)
                .slice(0, 4)
                .map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleReadMore(post.id)}
                    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  >
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block ${getCategoryColor(post.category)}`}>
                      {post.category.replace('-', ' ')}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{post.readTime}</span>
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
              AI Website Builder Blog
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Stay updated with the latest trends, tutorials, and insights in AI-powered web development
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-64 md:h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop`;
                  }}
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredPost.category)}`}>
                    {categories.find(cat => cat.value === featuredPost.category)?.label}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">Featured Post</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="mr-4">{featuredPost.readTime}</span>
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{featuredPost.views}</span>
                  </div>
                  <button 
                    onClick={() => handleReadMore(featuredPost.id)}
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleReadMore(post.id)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop`;
                }}
              />
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {categories.find(cat => cat.value === post.category)?.label}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-xs text-gray-500">
                  <User className="w-3 h-3 mr-1" />
                  <span className="mr-3">{post.author}</span>
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="mr-3">{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="mr-3">{post.readTime}</span>
                  <Eye className="w-3 h-3 mr-1" />
                  <span>{post.views}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-gray-100 mb-6">
            Get the latest articles, tutorials, and AI insights delivered to your inbox
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isSubscribing}
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
