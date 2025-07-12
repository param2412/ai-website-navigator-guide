import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Clock, Send, CheckCircle, HelpCircle, Book } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'medium',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed help via email',
      response: 'Response within 24 hours',
      action: 'Send Email',
      color: 'bg-blue-500',
      href: 'mailto:pdtechnologyinfo@gmail.com'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      response: 'Available 10 AM - 5 PM IST',
      action: 'Start Chat',
      color: 'bg-green-500',
      href: '#chat'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with support',
      response: 'Mon-Fri, 10 AM - 5 PM IST',
      action: 'Call Now',
      color: 'bg-purple-500',
      href: 'tel:+919099278738'
    }
  ];

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          question: 'How do I create my first workflow?',
          answer: 'Start by taking our questionnaire to get personalized recommendations, then follow the generated workflow steps.'
        },
        {
          question: 'What AI tools are included?',
          answer: 'We feature 20+ carefully curated AI tools for design, development, content creation, and more.'
        },
        {
          question: 'Is there a free plan available?',
          answer: 'Yes! Our free plan includes access to basic workflows and tool recommendations.'
        }
      ]
    },
    {
      title: 'AI Tools & Integration',
      icon: '🤖',
      questions: [
        {
          question: 'How do I integrate third-party AI tools?',
          answer: 'Most tools integrate via API keys or direct links. Check our integration guide for specific instructions.'
        },
        {
          question: 'Can I suggest new AI tools?',
          answer: 'Absolutely! Use our tool suggestion form or contact support with your recommendations.'
        },
        {
          question: 'Why is a recommended tool not working?',
          answer: 'Check your API keys, tool availability, and our status page. Contact support if issues persist.'
        }
      ]
    },
    {
      title: 'Workflows & Customization',
      icon: '⚡',
      questions: [
        {
          question: 'Can I modify existing workflows?',
          answer: 'Yes! Premium users can customize workflows or create entirely new ones from scratch.'
        },
        {
          question: 'How do I save my progress?',
          answer: 'Progress is automatically saved for registered users. You can also manually bookmark steps.'
        },
        {
          question: 'Can I share workflows with my team?',
          answer: 'Team sharing is available on our Business plan. Individual workflows can be exported.'
        }
      ]
    }
  ];

  const priorities = [
    { value: 'low', label: 'Low - General inquiry' },
    { value: 'medium', label: 'Medium - Need assistance' },
    { value: 'high', label: 'High - Blocking issue' },
    { value: 'urgent', label: 'Urgent - System down' }
  ];

  const categories = [
    { value: 'general', label: 'General Question' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing & Account' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Support ticket submitted successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        priority: 'medium',
        category: 'general',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to submit ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChannelClick = (href: string) => {
    if (href === '#chat') {
      toast('Live chat will be available soon!', { icon: '💬' });
    } else {
      window.open(href, '_blank');
    }
  };

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
              How can we help you?
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Get the support you need to build amazing websites with AI assistance
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Choose Your Support Channel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleChannelClick(channel.href)}
              >
                <div className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <channel.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  {channel.response}
                </div>
                <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200">
                  {channel.action}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      aria-label="Support category"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      aria-label="Support priority"
                    >
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                      <span className="text-2xl mr-2">{category.icon}</span>
                      {category.title}
                    </h3>
                    
                    <div className="space-y-3">
                      {category.questions.map((faq, faqIndex) => (
                        <details key={faqIndex} className="border border-gray-200 rounded-lg">
                          <summary className="p-4 cursor-pointer hover:bg-gray-50 flex items-center">
                            <HelpCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                            <span className="font-medium text-gray-900">{faq.question}</span>
                          </summary>
                          <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">More Ways to Get Help</h2>
            <p className="text-gray-100">
              Explore our comprehensive resources to find answers and learn new skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/docs"
              className="bg-white/20 rounded-lg p-6 text-center hover:bg-white/30 transition-colors duration-200"
            >
              <Book className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-gray-100">Comprehensive guides and API docs</p>
            </Link>
            
            <Link
              to="/blog"
              className="bg-white/20 rounded-lg p-6 text-center hover:bg-white/30 transition-colors duration-200"
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Blog & Updates</h3>
              <p className="text-sm text-gray-100">Latest news and best practices</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
