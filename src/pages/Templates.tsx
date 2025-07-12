import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Globe, ShoppingCart, Briefcase, Heart, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Templates: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const handleUseTemplate = (templateName: string) => {
    toast.success(`Starting project with ${templateName} template!`);
    // In a real app, this would navigate to questionnaire with template pre-selected
    window.location.href = '/questionnaire?template=' + encodeURIComponent(templateName);
  };

  const handlePreviewTemplate = (templateName: string) => {
    toast(`Preview for ${templateName} template`);
    // In a real app, this would open a preview modal or new tab
  };

  const handleCreateCustomTemplate = () => {
    toast.success('Redirecting to custom template creation!');
    // Navigate to questionnaire for custom template creation
    window.location.href = '/questionnaire?type=custom-template';
  };

  const handleImageError = (templateId: number) => {
    setImageErrors(prev => ({ ...prev, [templateId]: true }));
  };
  const templateCategories = [
    {
      id: 'business',
      name: 'Business',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      templates: [
        {
          id: 1,
          name: 'Corporate Professional',
          description: 'Clean, professional design for established businesses',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop&auto=format',
          banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop&auto=format',
          features: ['Responsive Design', 'Contact Forms', 'SEO Optimized'],
          price: 'Free'
        },
        {
          id: 2,
          name: 'Modern Startup',
          description: 'Contemporary design perfect for startups and tech companies',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&auto=format',
          banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format',
          features: ['Dark Mode', 'Animations', 'Mobile First'],
          price: 'Premium'
        }
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600',
      templates: [
        {
          id: 3,
          name: 'Online Store',
          description: 'Complete e-commerce solution with shopping cart',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&auto=format',
          banner: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format',
          features: ['Shopping Cart', 'Payment Integration', 'Inventory Management'],
          price: 'Premium'
        },
        {
          id: 4,
          name: 'Fashion Boutique',
          description: 'Elegant design for fashion and lifestyle brands',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&auto=format',
          banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&auto=format',
          features: ['Gallery Layouts', 'Product Showcase', 'Brand Focused'],
          price: 'Premium'
        }
      ]
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: Layout,
      color: 'from-purple-500 to-purple-600',
      templates: [
        {
          id: 5,
          name: 'Creative Portfolio',
          description: 'Showcase your creative work with style',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format',
          banner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format',
          features: ['Portfolio Gallery', 'Project Details', 'Contact Integration'],
          price: 'Free'
        },
        {
          id: 6,
          name: 'Minimalist Portfolio',
          description: 'Clean, minimal design focusing on your work',
          image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=200&fit=crop&auto=format',
          banner: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop&auto=format',
          features: ['Minimal Design', 'Fast Loading', 'Typography Focus'],
          price: 'Free'
        }
      ]
    },
    {
      id: 'personal',
      name: 'Personal',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      templates: [
        {
          id: 7,
          name: 'Personal Blog',
          description: 'Share your thoughts and stories',
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop&auto=format',
          banner: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop&auto=format',
          features: ['Blog System', 'Comments', 'Social Sharing'],
          price: 'Free'
        },
        {
          id: 8,
          name: 'Wedding Website',
          description: 'Beautiful templates for your special day',
          image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=200&fit=crop&auto=format',
          banner: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop&auto=format',
          features: ['RSVP System', 'Photo Gallery', 'Event Details'],
          price: 'Premium'
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Website Templates
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Choose from our collection of professionally designed templates. 
              Each template is optimized for performance, SEO, and mobile devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <span className="text-sm font-medium">20+ Templates</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <span className="text-sm font-medium">Mobile Responsive</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <span className="text-sm font-medium">AI Optimized</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {templateCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div key={category.id} variants={itemVariants}>
                  <div className="flex items-center mb-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.templates.map((template) => (
                      <motion.div
                        key={template.id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        <div className="aspect-video bg-gray-200 relative overflow-hidden">
                          {!imageErrors[template.id] ? (
                            <img 
                              src={template.image} 
                              alt={template.name}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(template.id)}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                              <Layout className="w-12 h-12 text-gray-500" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <button 
                              onClick={() => handlePreviewTemplate(template.name)}
                              className="opacity-0 hover:opacity-100 bg-white bg-opacity-90 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                            >
                              Preview
                            </button>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              template.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {template.price}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {template.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {template.description}
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            {template.features.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleUseTemplate(template.name)}
                              className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200"
                            >
                              Use Template
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need a Custom Template?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our AI can create a personalized template based on your specific needs and preferences.
            </p>
            <button 
              onClick={handleCreateCustomTemplate}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Create Custom Template
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
