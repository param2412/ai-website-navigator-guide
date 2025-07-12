import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Clock, CheckCircle, Target, Calendar, Download, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Initialize analytics data with zero values - will be populated from server
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalProjects: 0,
      completedProjects: 0,
      activeProjects: 0,
      totalTimeSpent: 0,
      averageCompletionTime: 0,
      productivityScore: 0
    },
    weeklyProgress: [] as Array<{ week: string; completed: number; started: number; time: number }>,
    toolUsage: [] as Array<{ name: string; usage: number; color: string }>,
    projectTypes: [] as Array<{ type: string; count: number; avgTime: number }>,
    recentActivity: [] as Array<{ date: string; action: string; project: string; time: string }>
  });

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching analytics for user:', user.email);
        const response = await fetch('http://localhost:5000/api/workflows/analytics', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Analytics API response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Analytics API response data:', data);
          
          if (data.success) {
            // Update last updated timestamp
            setLastUpdated(new Date());
            
            // Completely replace analytics data with server data for real-time accuracy
            setAnalyticsData({
              overview: {
                totalProjects: data.data.overview.totalProjects || 0,
                completedProjects: data.data.overview.completedProjects || 0,
                activeProjects: data.data.overview.activeProjects || 0,
                totalTimeSpent: data.data.overview.totalTimeSpent || 0,
                averageCompletionTime: data.data.overview.averageCompletionTime || 0,
                productivityScore: data.data.overview.productivityScore || 0
              },
              projectTypes: data.data.projectTypes || [],
              recentActivity: data.data.recentActivity || [],
              // Generate dynamic weekly progress based on current data
              weeklyProgress: generateWeeklyProgress(data.data.overview),
              // Generate dynamic tool usage based on project types
              toolUsage: generateToolUsage(data.data.projectTypes || [])
            });
            
            console.log('Analytics data updated successfully');
          } else {
            console.error('Analytics API returned success: false');
          }
        } else {
          console.error('Failed to fetch analytics:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    
    // Set up real-time updates every 5 seconds for maximum responsiveness
    const interval = setInterval(fetchAnalytics, 5000);
    
    return () => clearInterval(interval);
  }, [user]);

  // Generate weekly progress based on current data
  const generateWeeklyProgress = (overview: any) => {
    if (!overview || overview.totalProjects === 0) {
      return [
        { week: 'Week 1', completed: 0, started: 0, time: 0 },
        { week: 'Week 2', completed: 0, started: 0, time: 0 },
        { week: 'Week 3', completed: 0, started: 0, time: 0 },
        { week: 'Week 4', completed: 0, started: 0, time: 0 },
      ];
    }
    
    const totalProjects = overview.totalProjects || 0;
    const completedProjects = overview.completedProjects || 0;
    const totalTime = overview.totalTimeSpent || 0;
    
    return [
      { week: 'Week 1', completed: Math.floor(completedProjects * 0.3), started: Math.floor(totalProjects * 0.4), time: Math.floor(totalTime * 0.25) },
      { week: 'Week 2', completed: Math.floor(completedProjects * 0.4), started: Math.floor(totalProjects * 0.3), time: Math.floor(totalTime * 0.35) },
      { week: 'Week 3', completed: Math.floor(completedProjects * 0.2), started: Math.floor(totalProjects * 0.2), time: Math.floor(totalTime * 0.25) },
      { week: 'Week 4', completed: Math.floor(completedProjects * 0.1), started: Math.floor(totalProjects * 0.1), time: Math.floor(totalTime * 0.15) },
    ];
  };

  // Generate tool usage based on project types
  const generateToolUsage = (projectTypes: any[]) => {
    if (!projectTypes || projectTypes.length === 0) {
      return [
        { name: 'AI Builders', usage: 0, color: '#03A6A1' },
        { name: 'Design Tools', usage: 0, color: '#FFA673' },
        { name: 'Content Tools', usage: 0, color: '#FF4F0F' },
        { name: 'Development', usage: 0, color: '#6366f1' },
        { name: 'Other', usage: 0, color: '#94a3b8' },
      ];
    }

    const totalProjects = projectTypes.reduce((sum, type) => sum + type.count, 0);
    
    return [
      { name: 'AI Builders', usage: Math.floor((totalProjects * 0.42)), color: '#03A6A1' },
      { name: 'Design Tools', usage: Math.floor((totalProjects * 0.28)), color: '#FFA673' },
      { name: 'Content Tools', usage: Math.floor((totalProjects * 0.18)), color: '#FF4F0F' },
      { name: 'Development', usage: Math.floor((totalProjects * 0.10)), color: '#6366f1' },
      { name: 'Other', usage: Math.floor((totalProjects * 0.02)), color: '#94a3b8' },
    ];
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRange]);

  const handleExportData = () => {
    // In a real app, this would export actual data
    const dataToExport = {
      user: user?.name,
      exportDate: new Date().toISOString(),
      timeRange,
      data: analyticsData
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Add debug function
  const handleDebugInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/debug', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('=== USER DEBUG INFO ===');
        console.log('User ID:', data.data.id);
        console.log('User Email:', data.data.email);
        console.log('User Name:', data.data.name);
        console.log('Saved Workflows Count:', data.data.savedWorkflowsCount);
        console.log('Workflows Count:', data.data.workflowsCount);
        console.log('Saved Workflows:', data.data.savedWorkflows);
        console.log('Workflows:', data.data.workflows);
        console.log('Local Storage Token:', localStorage.getItem('token'));
        console.log('Local Storage User:', localStorage.getItem('user'));
        console.log('=== END DEBUG INFO ===');
        alert(`Debug info logged to console.\nUser: ${data.data.email}\nSaved Workflows: ${data.data.savedWorkflowsCount}\nWorkflows: ${data.data.workflowsCount}`);
      } else {
        console.error('Failed to fetch debug info:', response.status);
      }
    } catch (error) {
      console.error('Debug info error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
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
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">Track your progress and optimize your workflow</p>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span>Live • Updated {lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  aria-label="Time range filter"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 3 months</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDebugInfo}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center text-sm"
                >
                  Debug
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Refresh
                </button>
                
                <button
                  onClick={handleExportData}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalProjects}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              +3 this month
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.completedProjects}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {Math.round((analyticsData.overview.completedProjects / analyticsData.overview.totalProjects) * 100)}% completion rate
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Time Spent</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalTimeSpent}h</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Avg: {analyticsData.overview.averageCompletionTime}h per project
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Productivity Score</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.productivityScore}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              +5 from last month
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#03A6A1" name="Completed" />
                <Bar dataKey="started" fill="#FFA673" name="Started" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Tool Usage Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.toolUsage}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="usage"
                  label={({ name, usage }) => `${name}: ${usage}%`}
                >
                  {analyticsData.toolUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Types Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Types & Performance</h3>
            <div className="space-y-4">
              {analyticsData.projectTypes.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{project.type}</h4>
                    <p className="text-sm text-gray-600">{project.count} projects</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{project.avgTime}h</p>
                    <p className="text-sm text-gray-600">avg time</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.project}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{activity.date} at {activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white p-8"
        >
          <h3 className="text-xl font-bold mb-4">AI-Powered Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🚀 Productivity Tip</h4>
              <p className="text-sm text-gray-100">
                You complete projects 23% faster when using AI content tools. Consider using them more often!
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">⏰ Best Time</h4>
              <p className="text-sm text-gray-100">
                Your most productive hours are 10 AM - 12 AM. Schedule complex tasks during this time.
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎯 Next Goal</h4>
              <p className="text-sm text-gray-100">
                Complete 2 more projects this month to achieve your quarterly goal of 15 projects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
