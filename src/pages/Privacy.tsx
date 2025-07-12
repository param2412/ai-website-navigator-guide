import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, FileText, AlertCircle } from 'lucide-react';

const Privacy: React.FC = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FileText,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, phone number, and any other information you choose to provide.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect information about how you use our service, including your IP address, browser type, device information, pages visited, and the time and date of your visits.'
        },
        {
          subtitle: 'Cookies and Tracking',
          text: 'We use cookies and similar tracking technologies to collect information about your browsing activities and to provide personalized experiences. You can control cookies through your browser settings.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our AI Website Builder Assistant service, including personalizing your experience and providing customer support.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your information to send you technical notices, updates, security alerts, and administrative messages, as well as marketing communications if you have opted in.'
        },
        {
          subtitle: 'Analytics and Improvement',
          text: 'We analyze usage patterns to understand how our service is used and to improve our features, develop new services, and enhance user experience.'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: Eye,
      content: [
        {
          subtitle: 'Third-Party Services',
          text: 'We may share your information with third-party service providers who perform services on our behalf, such as hosting, analytics, and customer support. These providers are bound by confidentiality agreements.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required to do so by law or in response to valid requests by public authorities, or to protect our rights, privacy, safety, or property.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          subtitle: 'Data Encryption',
          text: 'All data transmission is encrypted using industry-standard SSL/TLS protocols. Personal information is stored in encrypted databases with restricted access.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We maintain strict access controls and regularly review who has access to personal information. Our employees are trained on privacy and security best practices.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Choices',
      icon: Shield,
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us directly.'
        },
        {
          subtitle: 'Data Portability',
          text: 'You have the right to request a copy of your personal information in a structured, machine-readable format, and to transmit that data to another service provider.'
        },
        {
          subtitle: 'Deletion',
          text: 'You can request deletion of your personal information, subject to certain exceptions such as legal requirements or legitimate business needs.'
        },
        {
          subtitle: 'Opt-Out',
          text: 'You can opt out of marketing communications at any time by following the unsubscribe instructions in our emails or updating your preferences in your account settings.'
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your information.
            </p>
            <p className="text-sm text-white/80">
              Last updated: June 28, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-12"
          >
            <div className="flex items-center mb-6">
              <AlertCircle className="w-6 h-6 text-primary-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              AI Website Builder Assistant ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
              you use our website and services. Please read this privacy policy carefully. If you do not agree 
              with the terms of this privacy policy, please do not access the site or use our services.
            </p>
          </motion.div>

          {/* Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg p-8 mt-12"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-white/90 mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us using the information below:
            </p>
            <div className="space-y-2">
              <p className="text-white/90">
                <strong>Email:</strong> pdtechnologyinfo@gmail.com
              </p>
              <p className="text-white/90">
                <strong>Address:</strong> India
              </p>
              {/* <p className="text-white/90">
                <strong>Phone:</strong> +91 90992 78738
              </p> */}
            </div>
          </motion.div>

          {/* Updates Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-xl p-6 mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Changes to This Privacy Policy
            </h3>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date. 
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
