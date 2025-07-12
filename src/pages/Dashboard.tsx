/* eslint-disable react/forbid-dom-props */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  Play,
  Pause,
  Layout,
  Trash2 as Trash,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { usersAPI, workflowsAPI } from '../services/api';
import { SavedWorkflow } from '../types';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { user, setUser } = useAuth();
  const [savedWorkflows, setSavedWorkflows] = useState<SavedWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    bio: '',
    company: '',
    website: ''
  });

  // Initialize form with user data when modal opens
  useEffect(() => {
    if (showEditModal && user) {
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        company: user.company || '',
        website: user.website || ''
      });
    }
  }, [showEditModal, user]);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Call the API to update profile
      const response = await usersAPI.updateProfile({
        name: editForm.name,
        email: editForm.email,
        bio: editForm.bio,
        company: editForm.company,
        website: editForm.website
      });
      
      // Update the user context with new data
      if (setUser && response.data?.data) {
        setUser(response.data.data);
        // Also update localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      
      toast.success('Profile updated successfully!');
      setShowEditModal(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    // Reset form to original values
    if (user) {
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        company: user.company || '',
        website: user.website || ''
      });
    }
  };

  // Progress bar component
  const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    const getWidthClass = (progress: number) => {
      if (progress >= 90) return 'w-full';
      if (progress >= 75) return 'w-3/4';
      if (progress >= 50) return 'w-1/2';
      if (progress >= 25) return 'w-1/4';
      return 'w-1/12';
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300 ${getWidthClass(progress)}`} />
      </div>
    );
  };

  useEffect(() => {
    fetchUserData();
    
    // Set up real-time updates every 30 seconds for workflows
    const interval = setInterval(() => {
      fetchUserData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      console.log('Dashboard: Fetching user workflows...');
      const response = await usersAPI.getWorkflows();
      console.log('Dashboard: API response:', response.data);
      setSavedWorkflows(response.data.data);
      console.log('Dashboard: Workflows set to state:', response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (workflow: SavedWorkflow) => {
    if (!workflow.progress || workflow.progress.length === 0) return 0;
    const completedSteps = workflow.progress.filter(step => step.completed).length;
    return Math.round((completedSteps / workflow.progress.length) * 100);
  };

  const getWorkflowStatus = (workflow: SavedWorkflow) => {
    const progress = getProgressPercentage(workflow);
    if (progress === 0) return { label: 'Not Started', color: 'text-gray-500' };
    if (progress === 100) return { label: 'Completed', color: 'text-green-600' };
    return { label: 'In Progress', color: 'text-blue-600' };
  };

  const handleContactClick = (type: 'email' | 'phone' | 'chat') => {
    switch (type) {
      case 'email':
        window.open('mailto:pdtechnologyinfo@gmail.com', '_blank');
        break;
      // case 'phone':
      //   window.open('tel:+919099278738', '_blank');
      //   break;
      case 'chat':
        toast('Chat support will be available soon!', { icon: '💬' });
        break;
    }
  };

  const handleContinueWorkflow = (workflow: SavedWorkflow) => {
    // Create mock questionnaire data based on workflow type
    const mockFormData = {
      websiteType: 'e-commerce',
      primaryGoal: 'sell-products',
      budget: '$1000-5000',
      skillLevel: 'beginner',
      aiNeeds: ['design-assistance', 'content-generation', 'seo-optimization'],
      timeline: '1-2 weeks'
    };
    
    // Store in localStorage for the Recommendations page
    localStorage.setItem('questionnaire-data', JSON.stringify(mockFormData));
    
    // Navigate to recommendations with the workflow ID
    window.location.href = `/recommendations?workflowId=${workflow.workflowId}`;
  };

  const handleClearWorkflows = async () => {
    if (!confirm('Are you sure you want to clear all workflows? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/workflows', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Clear local state immediately
          setSavedWorkflows([]);
          // Refetch data from server to ensure sync
          await fetchUserData();
          toast.success('All workflows cleared successfully!');
        } else {
          toast.error(data.message || 'Failed to clear workflows');
        }
      } else {
        toast.error('Failed to clear workflows');
      }
    } catch (error) {
      console.error('Error clearing workflows:', error);
      toast.error('Failed to clear workflows');
    }
  };

  const handleDeleteWorkflow = async (workflowId: string) => {
    if (!confirm('Are you sure you want to delete this workflow?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/workflows/${workflowId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update local state immediately
          setSavedWorkflows(prevWorkflows => 
            prevWorkflows.filter(workflow => workflow.workflowId !== workflowId)
          );
          // Refetch data to ensure sync
          await fetchUserData();
          toast.success('Workflow deleted successfully!');
        } else {
          toast.error(data.message || 'Failed to delete workflow');
        }
      } else {
        toast.error('Failed to delete workflow');
      }
    } catch (error) {
      console.error('Error deleting workflow:', error);
      toast.error('Failed to delete workflow');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Continue building your dream website with AI-powered guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  to="/questionnaire"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold mb-1">Start New Project</h3>
                  <p className="text-sm opacity-90">Create a new website workflow</p>
                </Link>
                
                <Link
                  to="/tools"
                  className="bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-lg hover:border-primary-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <BookOpen className="w-6 h-6 mb-2 text-primary-500" />
                  <h3 className="font-semibold mb-1">Browse Tools</h3>
                  <p className="text-sm text-gray-600">Explore AI tools directory</p>
                </Link>
                
                <Link
                  to="/templates"
                  className="bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-lg hover:border-primary-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Layout className="w-6 h-6 mb-2 text-primary-500" />
                  <h3 className="font-semibold mb-1">Browse Templates</h3>
                  <p className="text-sm text-gray-600">Choose from pre-made designs</p>
                </Link>
              </div>
            </motion.div>

            {/* Saved Workflows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Workflows
                </h2>
                <div className="flex items-center space-x-2">
                  <Link
                    to="/questionnaire"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Create New +
                  </Link>
                  <button
                    onClick={handleClearWorkflows}
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                    disabled={savedWorkflows.length === 0}
                  >
                    <Trash className="w-4 h-4 mr-1" />
                    Clear All
                  </button>
                </div>
              </div>

              {savedWorkflows.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No workflows yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start by creating your first website workflow
                  </p>
                  <Link
                    to="/questionnaire"
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedWorkflows.map((workflow, index) => {
                    const status = getWorkflowStatus(workflow);
                    const progress = getProgressPercentage(workflow);
                    
                    return (
                      <motion.div
                        key={workflow.workflowId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">
                            {workflow.workflowName}
                          </h3>
                          <span className={`text-sm font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <ProgressBar progress={progress} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>
                              Started {new Date(workflow.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleContinueWorkflow(workflow)}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center transition-colors duration-200"
                            >
                              Continue
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </button>
                            <button
                              onClick={() => handleDeleteWorkflow(workflow.workflowId)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center transition-colors duration-200"
                            >
                              <Trash className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  {user?.company && (
                    <p className="text-xs text-gray-500">{user.company}</p>
                  )}
                </div>
              </div>
              
              {user?.bio && (
                <div className="mb-4">
                  <p className="text-sm text-gray-700 italic">{user.bio}</p>
                </div>
              )}
              
              <div className="space-y-2">
                {user?.website && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Website</span>
                    <a 
                      href={user.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary-500 hover:text-primary-600 flex items-center"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Visit
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Workflows created</span>
                  <span className="font-medium">{savedWorkflows.length}</span>
                </div>
              </div>
              
              <button 
                onClick={handleEditProfile}
                className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-sm opacity-90 mb-4">
                Our support team is here to help you succeed with your website building journey.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleContactClick('email')}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </button>
                
                <button
                  onClick={() => handleContactClick('phone')}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </button>
                
                <button
                  onClick={() => handleContactClick('chat')}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat
                </button>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Account created</p>
                    <p className="text-xs text-gray-500">Welcome to the platform!</p>
                  </div>
                </div>
                
                {savedWorkflows.length > 0 && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Started workflow</p>
                      <p className="text-xs text-gray-500">{savedWorkflows[0].workflowName}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">More activities coming soon...</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSaveProfile}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Tell us about yourself"
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">{editForm.bio.length}/500 characters</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your company name"
                      maxLength={100}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      value={editForm.website}
                      onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                      maxLength={200}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={isUpdating}
                  >
                    {isUpdating && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
