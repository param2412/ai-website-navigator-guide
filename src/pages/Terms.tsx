import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Scale, Shield, Users, Gavel } from 'lucide-react';

const Terms: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        {
          text: 'By accessing and using AI Website Builder Assistant ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          text: 'These Terms of Service constitute a legally binding agreement between you and AI Website Builder Assistant regarding your use of the Service.'
        }
      ]
    },
    {
      id: 'description',
      title: 'Description of Service',
      icon: Users,
      content: [
        {
          text: 'AI Website Builder Assistant is a platform that provides AI-powered tools and recommendations for building websites. The Service includes workflow management, tool recommendations, templates, and related features.'
        },
        {
          text: 'We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.'
        }
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts and Registration',
      icon: Shield,
      content: [
        {
          text: 'To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.'
        },
        {
          text: 'You are responsible for safeguarding the password and for maintaining the confidentiality of your account. You agree not to disclose your password to any third party and to take sole responsibility for activities that occur under your account.'
        },
        {
          text: 'We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion, including but not limited to violations of these Terms of Service.'
        }
      ]
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      icon: AlertTriangle,
      content: [
        {
          text: 'You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Service or interfere with any other party\'s use of the Service.'
        },
        {
          text: 'Prohibited activities include but are not limited to: transmitting spam, viruses, or malicious code; attempting to gain unauthorized access to the Service; using the Service to harass, abuse, or harm others; or violating any applicable laws or regulations.'
        },
        {
          text: 'We reserve the right to investigate and take appropriate legal action against anyone who violates this provision, including reporting you to law enforcement authorities.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: Scale,
      content: [
        {
          text: 'The Service and its original content, features, and functionality are and will remain the exclusive property of AI Website Builder Assistant and its licensors. The Service is protected by copyright, trademark, and other laws.'
        },
        {
          text: 'You retain ownership of content you create using the Service. However, by using the Service, you grant us a non-exclusive, royalty-free license to use, reproduce, and display your content solely for the purpose of providing the Service.'
        },
        {
          text: 'You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our prior written consent.'
        }
      ]
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      icon: Gavel,
      content: [
        {
          text: 'Certain features of the Service require payment of fees. You agree to pay all fees associated with your use of paid features. All fees are non-refundable except as expressly stated in our refund policy.'
        },
        {
          text: 'Subscription fees are billed in advance on a monthly or annual basis. Your subscription will automatically renew unless you cancel before the renewal date.'
        },
        {
          text: 'We reserve the right to change our fees at any time. We will provide you with reasonable notice of any fee changes, and such changes will take effect at the start of your next billing cycle.'
        }
      ]
    }
  ];

  const additionalTerms = [
    {
      title: 'Disclaimers',
      content: 'The Service is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, materials, or products included on the Service.'
    },
    {
      title: 'Limitation of Liability',
      content: 'In no event shall AI Website Builder Assistant be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.'
    },
    {
      title: 'Indemnification',
      content: 'You agree to defend, indemnify, and hold harmless AI Website Builder Assistant and its affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the Service.'
    },
    {
      title: 'Governing Law',
      content: 'These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal action or proceeding shall be brought exclusively in the courts of California.'
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
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Please read these Terms of Service carefully before using our platform.
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
              <AlertTriangle className="w-6 h-6 text-primary-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Important Notice</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service ("Terms") govern your use of AI Website Builder Assistant 
              ("Service") operated by AI Website Builder Assistant ("us", "we", or "our"). 
              By using our Service, you agree to be bound by these Terms. If you disagree with 
              any part of these terms, then you may not access the Service.
            </p>
          </motion.div>

          {/* Main Sections */}
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
                  
                  <div className="space-y-4">
                    {section.content.map((item, index) => (
                      <p key={index} className="text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Additional Terms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {additionalTerms.map((term, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {term.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg p-8 mt-8"
          >
            <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="text-white/90 mb-6">
              If you have any questions about these Terms of Service, please contact us:
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
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-xl p-6 mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Changes to Terms of Service
            </h3>
            <p className="text-gray-600">
              We reserve the right to modify or replace these Terms at any time. If a revision 
              is material, we will provide at least 30 days notice prior to any new terms taking 
              effect. By continuing to access or use our Service after those revisions become 
              effective, you agree to be bound by the revised terms.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
