import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const teamMembers: Array<{ name: string; role: string; image: string }> = [
    // { name: 'Param Parikh', role: 'CEO & Founder', image: '/api/placeholder/150/150' },
    // { name: 'Emily Rodriguez', role: 'Head of AI Research', image: '/api/placeholder/150/150' },
    // { name: 'David Kim', role: 'Lead Developer', image: '/api/placeholder/150/150' },
    // { name: 'Devansh Prajapati', role: 'CTO & Co-Founder', image: '/api/placeholder/150/150' },
  ];

  const stats = [
    { number: '30+', label: 'Websites Built' },
    { number: '20+', label: 'AI Tools Integrated' },
    { number: '3+', label: 'Countries Served' },
    { number: '100%', label: 'Customer Satisfaction' },
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              We're on a mission to democratize website creation through AI-powered tools and intelligent guidance
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We believe that everyone should have access to powerful web development tools, regardless of their technical background. 
            Our platform combines the latest AI technologies with intuitive workflows to help users create professional websites 
            in a fraction of the time it traditionally takes.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Centric</h3>
              <p className="text-gray-600">
                Every feature we build is designed with our users' needs and success in mind.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously explore cutting-edge AI technologies to improve our platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Efficiency</h3>
              <p className="text-gray-600">
                We help users achieve their goals faster without compromising on quality.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          {/* <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">
                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Want to learn more?</h2>
          <p className="text-gray-100 mb-6">
            Get in touch with our team to discuss how we can help you build amazing websites
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Link>
            <Link
              to="/support"
              className="bg-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors duration-200 flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Get Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
