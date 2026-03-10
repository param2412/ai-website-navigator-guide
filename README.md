📖 Overview
The AI Website Navigator Guide is a sophisticated web application designed to enhance user interaction with websites through artificial intelligence. It integrates with various cutting-edge Large Language Models (LLMs) such as OpenAI, Perplexity AI, and Google Generative AI to offer an intuitive and guided browsing experience. This project serves as a dynamic assistant, capable of understanding context, providing relevant information, and assisting users in navigating complex web content seamlessly.

✨ Features
🎯 Multi-AI Integration: Seamlessly connect with OpenAI, Perplexity AI, and Google Generative AI for diverse AI capabilities.
🗣️ Interactive Guidance: Receive context-aware assistance and intelligent navigation suggestions based on website content.
🌐 Frontend-Backend Communication: Robust architecture supporting communication between the React frontend and Node.js/Express backend.
⚙️ Configurable AI Models: Easily switch or configure different AI models via environment variables.
🎨 Modern UI: Built with React and styled using Tailwind CSS for a responsive and intuitive user interface.
🚀 Optimized Development Workflow: Leverages Vite for a fast development experience and efficient builds.

🚀 Quick Start
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher recommended)
npm (Node Package Manager, usually comes with Node.js)
Installation
Clone the repository

git clone https://github.com/param2412/ai-website-navigator-guide.git
cd ai-website-navigator-guide
Install dependencies for both frontend and backend

npm install
cd expressbackend # Navigate to the backend directory
npm install
cd .. # Go back to the root directory
Environment setup
Create a .env file in the root directory by copying .env.example:

cp .env.example .env
Then, open .env and configure your environment variables:

# Frontend AI API Keys (Used by the frontend to call backend API routes)
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key_here
VITE_GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_api_key_here

# Backend configuration (for the expressbackend service)
PORT=3000
# Add any backend-specific keys here if they are directly used by expressbackend
For detailed environment setup, refer to ENVIRONMENT_SETUP.md.

Start development servers
First, start the backend server:

cd expressbackend
npm run dev
In a new terminal, start the frontend development server from the root directory:

cd ..
npm run dev
Open your browser
Visit http://localhost:5173 (or the port indicated by Vite) for the frontend application. The backend will be running on http://localhost:3000 (or your configured PORT).

📁 Project Structure
ai-website-navigator-guide/
├── .env.example           # Example environment variables
├── .gitignore             # Files and directories to ignore in Git
├── DEPLOYMENT.md          # Deployment guide
├── ENVIRONMENT_SETUP.md   # Detailed environment setup instructions
├── FIXES_SUMMARY.md       # Summary of fixes and improvements
├── VERCEL_ANALYSIS_GUIDE.md # Guide for Vercel deployment and analysis
├── api/                   # (Potential) Vercel Serverless Functions for API routes
├── expressbackend/        # Node.js/Express.js backend service
│   ├── src/               # Backend source code
│   ├── package.json       # Backend dependencies and scripts
│   └── tsconfig.json      # TypeScript configuration for backend
├── public/                # Static assets for the frontend
├── src/                   # Frontend source code (React, TypeScript)
│   ├── assets/            # Static assets like images
│   ├── components/        # Reusable React components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages/views
│   ├── services/          # API interaction logic
│   ├── utils/             # Utility functions
│   └── main.tsx           # Main entry point for the React application
├── index.html             # Main HTML file for the frontend
├── package.json           # Frontend dependencies and scripts
├── package-lock.json      # Node.js dependency lock file
├── postcss.config.js      # PostCSS configuration for styling
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration for frontend
├── tsconfig.node.json     # TypeScript configuration for Node.js build process
├── vercel.json            # Vercel deployment configuration
└── vite.config.ts         # Vite build tool configuration
⚙️ Configuration
Environment Variables
The application uses environment variables for sensitive data and configuration. Please ensure your .env file is properly configured.

Variable	Description	Default	Required
VITE_OPENAI_API_KEY	Your API key for OpenAI services.	-	Yes
VITE_PERPLEXITY_API_KEY	Your API key for Perplexity AI services.	-	Yes
VITE_GOOGLE_GENERATIVE_AI_API_KEY	Your API key for Google Generative AI services.	-	Yes
PORT	The port on which the Express.js backend will run.	3000	Yes
Configuration Files
vite.config.ts: Configures Vite for frontend bundling, including React plugin and environment variable handling.
tailwind.config.js: Defines Tailwind CSS customizations, themes, and plugins.
postcss.config.js: Configures PostCSS plugins, including Tailwind CSS and Autoprefixer.
tsconfig.json, tsconfig.node.json: TypeScript compiler options for the frontend and Node.js-specific configurations.
vercel.json: Specifies deployment settings for Vercel, including routes and build commands for a monorepo setup.
🔧 Development
Available Scripts
In the root directory:

Command	Description
npm run dev	Starts the frontend development server (using Vite).
npm run build	Compiles the frontend application for production.
npm run lint	Lints the frontend source code.
npm run preview	Serves the production build locally for testing.
In the expressbackend directory:

Command	Description
npm run dev	Starts the backend development server (using ts-node-dev).
npm run build	Compiles the TypeScript backend to JavaScript.
npm run start	Starts the compiled backend server.
Development Workflow
For active development, run both the frontend and backend development servers simultaneously in separate terminal windows as described in the Quick Start section. This allows for hot-reloading on frontend changes and automatic restarts on backend changes.

🧪 Testing
This project does not include explicit testing configurations or scripts in the package.json or visible structure. To implement testing, you would typically add:

# Example: Running tests with a hypothetical testing framework like Jest or Vitest
npm test
# For backend tests (if added)
cd expressbackend
npm test
🚀 Deployment
This project is configured for deployment on Vercel.

Production Build
To create a production-ready build of the frontend:

npm run build
