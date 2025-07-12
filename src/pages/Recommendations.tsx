import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Circle, 
  ExternalLink, 
  Clock, 
  Star, 
  Download,
  Bookmark,
  Share2,
  ArrowRight,
  Lightbulb,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { workflowsAPI } from '../services/api';
import { Workflow, QuestionnaireData } from '../types';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Recommendations: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateWorkflow = async () => {
      try {
        setLoading(true);
        
        // Get form data from location state or localStorage
        let formData: QuestionnaireData = 
          location.state?.formData || 
          JSON.parse(localStorage.getItem('questionnaire-data') || '{}');

        // If no questionnaire data found, create default data
        if (!formData.websiteType) {
          formData = {
            websiteType: 'e-commerce',
            primaryGoal: 'sell-products',
            budget: '$1000-5000',
            skillLevel: 'beginner',
            aiNeeds: ['design-assistance', 'content-generation', 'seo-optimization'],
            timeline: '1-2 weeks'
          };
          
          // Store the default data
          localStorage.setItem('questionnaire-data', JSON.stringify(formData));
          toast.success('Loading your workflow recommendations...');
        }

        const response = await workflowsAPI.generate(formData);
        setWorkflow(response.data.data);
      } catch (error) {
        console.error('Error generating workflow:', error);
        toast.error('Failed to generate recommendations');
      } finally {
        setLoading(false);
      }
    };

    generateWorkflow();
  }, [location.state]);

  const handleStepToggle = async (stepId: string) => {
    if (!workflow) {
      toast.error('Please log in to save your progress');
      return;
    }

    const isCompleted = completedSteps.has(stepId);
    const newCompleted = new Set(completedSteps);
    
    if (isCompleted) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    
    setCompletedSteps(newCompleted);

    try {
      if (isAuthenticated && workflow._id) {
        await workflowsAPI.updateProgress(workflow._id, stepId, !isCompleted);
      }
      toast.success(isCompleted ? 'Step marked as incomplete' : 'Step completed!');
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
      // Revert the change
      setCompletedSteps(completedSteps);
    }
  };

  const getProgressPercentage = () => {
    if (!workflow?.steps) return 0;
    return Math.round((completedSteps.size / workflow.steps.length) * 100);
  };

  const handleSaveToDashboard = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save workflows');
      return;
    }

    if (!workflow) {
      toast.error('No workflow to save');
      return;
    }

    try {
      console.log('Saving workflow:', workflow);
      
      // Save the workflow to the user's dashboard
      const progressData = Array.from(completedSteps).map(stepId => ({
        stepId,
        completed: true,
        completedAt: new Date()
      }));

      const workflowData = {
        workflowId: workflow._id || `temp-${Date.now()}`,
        name: workflow.name,
        description: workflow.description,
        progress: progressData
      };

      console.log('Sending workflow data:', workflowData);
      
      const response = await workflowsAPI.saveWorkflow(workflowData);
      console.log('Save response:', response);
      
      toast.success('Workflow saved to dashboard successfully!');
    } catch (error: any) {
      console.error('Error saving workflow:', error);
      
      let errorMessage = 'Failed to save workflow. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = 'Please log in again to save workflows.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid workflow data. Please try again.';
      }
      
      toast.error(errorMessage);
    }
  };

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareWorkflow = () => {
    if (navigator.share) {
      navigator.share({
        title: workflow?.name || 'My Website Building Workflow',
        text: 'Check out my personalized website building workflow!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Workflow link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized recommendations...</p>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Recommendations Found</h2>
          <p className="text-gray-600 mb-6">
            Please complete the questionnaire to get personalized recommendations.
          </p>
          <Link
            to="/questionnaire"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            Start Questionnaire
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">{workflow.name}</h1>
            <p className="text-xl text-gray-100 mb-6">{workflow.description}</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  🎯 {workflow.difficulty} Level
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  ⏱️ {workflow.estimatedDuration}
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  📊 {getProgressPercentage()}% Complete
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleShareWorkflow}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-200 flex items-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Workflow
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-200 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Export PDF
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Progress
              </h2>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{getProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-300 ${
                      getProgressPercentage() >= 90 ? 'w-full' :
                      getProgressPercentage() >= 75 ? 'w-3/4' :
                      getProgressPercentage() >= 50 ? 'w-1/2' :
                      getProgressPercentage() >= 25 ? 'w-1/4' : 'w-1/12'
                    }`}
                  />
                </div>
              </div>
              <p className="text-gray-600">
                {completedSteps.size} of {workflow.steps.length} steps completed
              </p>
            </motion.div>

            {/* Workflow Steps */}
            <div className="space-y-6">
              {workflow.steps.map((step, index) => {
                const isCompleted = completedSteps.has(step.id);
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                      isCompleted ? 'ring-2 ring-green-200' : ''
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start">
                          <button
                            onClick={() => handleStepToggle(step.id)}
                            className={`mt-1 mr-4 transition-colors duration-200 ${
                              isCompleted 
                                ? 'text-green-600 hover:text-green-700' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </button>
                          <div>
                            <h3 className={`text-xl font-semibold mb-2 ${
                              isCompleted ? 'text-green-800' : 'text-gray-900'
                            }`}>
                              Step {index + 1}: {step.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{step.description}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>Estimated time: {step.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recommended Tools */}
                      {step.tools && step.tools.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-lg font-medium text-gray-900 mb-3">
                            Recommended Tools
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {step.tools.map((toolRec, toolIndex) => {
                              // Handle both populated and unpopulated tool references
                              const tool = typeof toolRec.toolId === 'object' ? toolRec.toolId : toolRec;
                              
                              // Type guard to check if it's a Tool object with required properties
                              if (!tool || typeof tool !== 'object' || !('name' in tool) || !tool.name) {
                                return null;
                              }

                              const toolData = tool as any; // Cast to any to avoid TypeScript issues

                              return (
                                <div
                                  key={toolIndex}
                                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                  onClick={() => toolData.url && handleToolClick(toolData.url)}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h5 className="font-semibold text-gray-900">
                                      {toolData.name}
                                    </h5>
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {toolData.description || 'AI-powered tool to help with your project'}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                      <span className="text-sm text-gray-600">
                                        {toolData.rating || '4.5'}
                                      </span>
                                    </div>
                                  </div>
                                  {(toolRec as any).reason && (
                                    <p className="text-xs text-gray-500 mt-2">
                                      💡 {(toolRec as any).reason}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Resources */}
                      {step.resources && step.resources.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-lg font-medium text-gray-900 mb-3">
                            Helpful Resources
                          </h4>
                          <ul className="space-y-2">
                            {step.resources.map((resource, resIndex) => (
                              <li key={resIndex} className="flex items-center text-sm text-gray-600">
                                <Lightbulb className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl p-6 mt-8"
            >
              <h3 className="text-xl font-semibold mb-4">🎉 Ready to Launch?</h3>
              <p className="mb-6">
                Once you've completed all steps, you'll have a fully functional website. 
                Need help with any step? Our support team is here to assist you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/tools"
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                >
                  Explore More Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                >
                  Back to Dashboard
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Workflow Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Workflow Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Category</span>
                  <p className="font-medium">{workflow.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Difficulty</span>
                  <p className="font-medium capitalize">{workflow.difficulty}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Estimated Duration</span>
                  <p className="font-medium">{workflow.estimatedDuration}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Steps</span>
                  <p className="font-medium">{workflow.steps.length}</p>
                </div>
              </div>
              
              {workflow.tags && workflow.tags.length > 0 && (
                <div className="mt-4">
                  <span className="text-sm text-gray-600 block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Save Workflow */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Save Progress
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your progress is automatically saved. Access it anytime from your dashboard.
                </p>
                <button 
                  onClick={handleSaveToDashboard}
                  className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save to Dashboard
                </button>
              </motion.div>
            )}

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-sm opacity-90 mb-4">
                Stuck on a step? Our experts are here to help you succeed.
              </p>
              <Link
                to="/contact"
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Contact Support
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
