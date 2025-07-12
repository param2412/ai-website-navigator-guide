import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { QuestionnaireData } from '../types';
import toast from 'react-hot-toast';

const Questionnaire: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    websiteType: '',
    primaryGoal: '',
    budget: '',
    skillLevel: '',
    aiNeeds: [],
    timeline: '',
  });

  const { updatePreferences, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const questions = [
    {
      id: 'websiteType',
      title: 'What type of website do you want to build?',
      subtitle: 'Choose the option that best describes your project',
      type: 'single',
      options: [
        { value: 'E-commerce Store', label: 'E-commerce Store', description: 'Sell products online', icon: '🛒' },
        { value: 'Blog', label: 'Blog', description: 'Share content and articles', icon: '✍️' },
        { value: 'Portfolio', label: 'Portfolio', description: 'Showcase your work', icon: '🎨' },
        { value: 'Landing Page', label: 'Landing Page', description: 'Single page for marketing', icon: '🎯' },
        { value: 'Business Website', label: 'Business Website', description: 'Company or service website', icon: '🏢' },
        { value: 'Community Forum', label: 'Community Forum', description: 'Discussion platform', icon: '💬' },
        { value: 'Web App Prototype', label: 'Web App Prototype', description: 'Interactive application', icon: '⚡' },
      ],
    },
    {
      id: 'primaryGoal',
      title: "What's your primary goal for this website?",
      subtitle: 'Understanding your objective helps us recommend the right tools',
      type: 'single',
      options: [
        { value: 'Generate Leads', label: 'Generate Leads', description: 'Capture potential customers', icon: '📈' },
        { value: 'Sell Products', label: 'Sell Products', description: 'E-commerce and transactions', icon: '💰' },
        { value: 'Share Information', label: 'Share Information', description: 'Content and knowledge sharing', icon: '📚' },
        { value: 'Showcase Work', label: 'Showcase Work', description: 'Display portfolio and projects', icon: '🏆' },
        { value: 'Build a Community', label: 'Build a Community', description: 'Connect people with shared interests', icon: '👥' },
        { value: 'Brand Awareness', label: 'Brand Awareness', description: 'Increase visibility and recognition', icon: '📢' },
      ],
    },
    {
      id: 'budget',
      title: "What's your approximate budget for tools and hosting?",
      subtitle: 'This helps us recommend tools within your price range',
      type: 'single',
      options: [
        { value: 'Free', label: 'Free ($0)', description: 'Only free tools and services', icon: '🆓' },
        { value: '< ₹500/month', label: 'Under ₹500/month', description: 'Basic paid tools', icon: '💵' },
        { value: '₹500-₹2000/month', label: '₹500-₹2000/month', description: 'Professional tools', icon: '💳' },
        { value: '₹2000+/month', label: 'Over ₹2000/month', description: 'Premium enterprise tools', icon: '💎' },
      ],
    },
    {
      id: 'skillLevel',
      title: "What's your technical skill level?",
      subtitle: "We'll recommend tools that match your comfort level",
      type: 'single',
      options: [
        { value: 'No Code', label: 'No Code', description: 'I prefer drag-and-drop tools', icon: '🎨' },
        { value: 'Low Code', label: 'Low Code', description: 'Basic HTML/CSS is fine', icon: '🛠️' },
        { value: 'Comfortable with Code', label: 'Comfortable with Code', description: 'I can work with advanced tools', icon: '💻' },
      ],
    },
    {
      id: 'aiNeeds',
      title: 'Which AI-powered features do you need?',
      subtitle: 'Select all that apply to your project',
      type: 'multiple',
      options: [
        { value: 'Content Generation', label: 'Content Generation', description: 'AI-written text and copy', icon: '✍️' },
        { value: 'Design/Layout', label: 'Design/Layout', description: 'AI-assisted design', icon: '🎨' },
        { value: 'Image Creation', label: 'Image Creation', description: 'AI-generated images', icon: '🖼️' },
        { value: 'Code Generation', label: 'Code Generation', description: 'AI coding assistance', icon: '💻' },
        { value: 'SEO Optimization', label: 'SEO Optimization', description: 'AI SEO recommendations', icon: '🔍' },
        { value: 'Analytics Insights', label: 'Analytics Insights', description: 'AI-powered analytics', icon: '📊' },
      ],
    },
    {
      id: 'timeline',
      title: 'How quickly do you need this website live?',
      subtitle: 'This affects the complexity of our recommendations',
      type: 'single',
      options: [
        { value: 'Days', label: 'Days', description: 'ASAP, basic functionality', icon: '⚡' },
        { value: 'Weeks', label: 'Weeks', description: '2-4 weeks, good quality', icon: '📅' },
        { value: 'Months', label: 'Months', description: '1-3 months, comprehensive', icon: '🗓️' },
        { value: 'No Rush', label: 'No Rush', description: 'Take time for perfection', icon: '🌱' },
      ],
    },
  ];

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOptionSelect = (value: string) => {
    const questionId = currentQuestion.id as keyof QuestionnaireData;
    
    if (currentQuestion.type === 'multiple') {
      const currentValues = formData[questionId] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      setFormData(prev => ({
        ...prev,
        [questionId]: newValues,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [questionId]: value,
      }));
    }
  };

  const isOptionSelected = (value: string) => {
    const questionId = currentQuestion.id as keyof QuestionnaireData;
    const currentValue = formData[questionId];
    
    if (Array.isArray(currentValue)) {
      return currentValue.includes(value);
    }
    return currentValue === value;
  };

  const canProceed = () => {
    const questionId = currentQuestion.id as keyof QuestionnaireData;
    const currentValue = formData[questionId];
    
    if (Array.isArray(currentValue)) {
      return currentValue.length > 0;
    }
    return !!currentValue;
  };

  const handleNext = () => {
    if (canProceed()) {
      if (isLastStep) {
        handleSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isAuthenticated) {
        await updatePreferences(formData);
        
        // Create a workflow for the user
        try {
          const response = await fetch('http://localhost:5000/api/workflows/user-workflow', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: formData.websiteType.toLowerCase().replace(/\s+/g, '-'),
              name: `${formData.websiteType} Project`,
              goal: formData.primaryGoal
            })
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              toast.success('Workflow created successfully!');
            }
          }
        } catch (workflowError) {
          console.error('Error creating workflow:', workflowError);
          // Don't block the flow if workflow creation fails
        }
      } else {
        // Store in localStorage for non-authenticated users
        localStorage.setItem('questionnaire-data', JSON.stringify(formData));
      }
      
      // Navigate to recommendations with form data
      navigate('/recommendations', { state: { formData } });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {currentQuestion.title}
              </h1>
              <p className="text-lg text-gray-600">
                {currentQuestion.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-200 transform hover:scale-105 ${
                    isOptionSelected(option.value)
                      ? 'border-primary-500 bg-primary-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">{option.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {option.label}
                        </h3>
                        {isOptionSelected(option.value) && (
                          <Check className="w-5 h-5 text-primary-500" />
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentStep
                        ? 'bg-primary-500'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isLastStep ? 'Get Recommendations' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Need help? <button className="text-primary-600 hover:text-primary-700 underline">Contact our support team</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
