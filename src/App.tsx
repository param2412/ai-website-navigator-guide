import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import useScrollToTop from './hooks/useScrollToTop';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import Questionnaire from './pages/Questionnaire';
import Recommendations from './pages/Recommendations';
import Documentation from './pages/Documentation';
import Blog from './pages/Blog';
// import Tutorials from './pages/Tutorials'; // Deleted - tutorials page removed
import Support from './pages/Support';
import Analytics from './pages/Analytics';
import About from './pages/About';
import Contact from './pages/Contact';
import Templates from './pages/Templates';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

// App Routes component
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Use scroll to top hook
  useScrollToTop();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/auth" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Auth />} 
          />
          <Route path="/tools" element={<Tools />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/tutorials" element={<Tutorials />} /> */} {/* Tutorials page deleted */}
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recommendations" 
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#03A6A1',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#FF4F0F',
                secondary: '#fff',
              },
            },
          }}
        />
        <VercelAnalytics />
        <SpeedInsights />
      </Router>
    </AuthProvider>
  );
};

export default App;
