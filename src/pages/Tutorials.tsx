// TUTORIALS PAGE - COMMENTED OUT FOR NOW
// Will be implemented later with proper video content

/*
TODO: Implement tutorials page with:
- Video tutorials for AI website building
- Step-by-step guides
- Interactive learning modules
- Progress tracking
- Categories and filtering
- Search functionality
- Video player modal
- Real YouTube video integration

This page has been temporarily disabled to focus on core functionality.
Videos will be added once the main website features are complete.
*/

import React from 'react';
import { BookOpen, Clock, Play } from 'lucide-react';

const Tutorials: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Video Tutorials
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Coming Soon - Comprehensive video tutorials for AI website building
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <Play className="w-16 h-16 text-primary-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tutorials Under Development
            </h2>
            <p className="text-gray-600 mb-6">
              We're working on creating comprehensive video tutorials to help you master AI-powered website building. 
              These tutorials will be available once the core website features are complete.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Clock className="w-8 h-8 text-primary-500 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Coming Soon</h3>
                <p className="text-sm text-gray-600">Video tutorials will be added after core development</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-primary-500 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Comprehensive Content</h3>
                <p className="text-sm text-gray-600">Step-by-step guides for all skill levels</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-500">
                In the meantime, explore our <strong>Tools</strong> section and try the <strong>Questionnaire</strong> to get started with your AI website building journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
