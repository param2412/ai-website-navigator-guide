// Tools API endpoint for Vercel
module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      // Complete fallback data with all 22 tools
      const fallbackTools = [
        {
          _id: '1',
          name: 'ChatGPT',
          description: 'Advanced AI chatbot for conversations, writing, and problem-solving',
          category: 'AI Chat',
          url: 'https://chat.openai.com',
          isPremium: false,
          features: ['Natural language processing', 'Code generation', 'Creative writing'],
          pricing: 'Free tier available, Premium plans from $20/month'
        },
        {
          _id: '2',
          name: 'Midjourney',
          description: 'AI-powered image generation from text descriptions',
          category: 'AI Art',
          url: 'https://midjourney.com',
          isPremium: true,
          features: ['High-quality image generation', 'Multiple art styles', 'Commercial use'],
          pricing: 'Plans from $10/month'
        },
        {
          _id: '3',
          name: 'GitHub Copilot',
          description: 'AI-powered code completion and programming assistant',
          category: 'Development',
          url: 'https://copilot.github.com',
          isPremium: true,
          features: ['Code autocompletion', 'Function generation', 'Multi-language support'],
          pricing: '$10/month for individuals'
        },
        {
          _id: '4',
          name: 'Notion AI',
          description: 'AI writing assistant integrated into Notion workspace',
          category: 'Productivity',
          url: 'https://notion.so',
          isPremium: true,
          features: ['Content generation', 'Text improvement', 'Brainstorming'],
          pricing: 'Add-on for Notion plans'
        },
        {
          _id: '5',
          name: 'Jasper AI',
          description: 'AI content creation platform for marketing and business',
          category: 'Content Creation',
          url: 'https://jasper.ai',
          isPremium: true,
          features: ['Marketing copy', 'Blog posts', 'Social media content'],
          pricing: 'Plans from $39/month'
        },
        {
          _id: '6',
          name: 'Stable Diffusion',
          description: 'Open-source AI model for generating images from text',
          category: 'AI Art',
          url: 'https://stability.ai',
          isPremium: false,
          features: ['Open source', 'Customizable', 'Local deployment'],
          pricing: 'Free (open source)'
        },
        {
          _id: '7',
          name: 'Claude AI',
          description: 'Advanced AI assistant by Anthropic for analysis and conversation',
          category: 'AI Chat',
          url: 'https://claude.ai',
          isPremium: false,
          features: ['Long-form conversations', 'Document analysis', 'Coding assistance'],
          pricing: 'Free tier available'
        },
        {
          _id: '8',
          name: 'Runway ML',
          description: 'AI-powered creative tools for video and image editing',
          category: 'Video/Image',
          url: 'https://runwayml.com',
          isPremium: true,
          features: ['Video generation', 'Image editing', 'Motion graphics'],
          pricing: 'Plans from $15/month'
        },
        {
          _id: '9',
          name: 'Copy.ai',
          description: 'AI copywriting tool for marketing and sales content',
          category: 'Content Creation',
          url: 'https://copy.ai',
          isPremium: false,
          features: ['Marketing copy', 'Email templates', 'Product descriptions'],
          pricing: 'Free tier available, Pro from $36/month'
        },
        {
          _id: '10',
          name: 'Luma AI',
          description: '3D capture and AI-powered 3D content creation',
          category: '3D/AR',
          url: 'https://lumalabs.ai',
          isPremium: false,
          features: ['3D scanning', 'NeRF technology', 'Mobile app'],
          pricing: 'Free tier available'
        },
        {
          _id: '11',
          name: 'Synthesia',
          description: 'AI video generation with virtual presenters',
          category: 'Video/Image',
          url: 'https://synthesia.io',
          isPremium: true,
          features: ['AI avatars', 'Multi-language', 'Custom branding'],
          pricing: 'Plans from $30/month'
        },
        {
          _id: '12',
          name: 'Replit AI',
          description: 'AI-powered coding assistant and development environment',
          category: 'Development',
          url: 'https://replit.com',
          isPremium: false,
          features: ['Code generation', 'Debugging', 'Collaborative coding'],
          pricing: 'Free tier available'
        },
        {
          _id: '13',
          name: 'Perplexity AI',
          description: 'AI-powered search engine and research assistant',
          category: 'Research',
          url: 'https://perplexity.ai',
          isPremium: false,
          features: ['Real-time search', 'Source citations', 'Follow-up questions'],
          pricing: 'Free tier available, Pro from $20/month'
        },
        {
          _id: '14',
          name: 'Character.AI',
          description: 'Platform for creating and chatting with AI characters',
          category: 'Entertainment',
          url: 'https://character.ai',
          isPremium: false,
          features: ['Custom characters', 'Role-playing', 'Creative conversations'],
          pricing: 'Free tier available'
        },
        {
          _id: '15',
          name: 'Writesonic',
          description: 'AI writing assistant for content creation and copywriting',
          category: 'Content Creation',
          url: 'https://writesonic.com',
          isPremium: false,
          features: ['Article writing', 'Ad copy', 'SEO optimization'],
          pricing: 'Free tier available, plans from $19/month'
        },
        {
          _id: '16',
          name: 'ElevenLabs',
          description: 'AI voice synthesis and text-to-speech technology',
          category: 'Audio',
          url: 'https://elevenlabs.io',
          isPremium: false,
          features: ['Voice cloning', 'Multiple languages', 'High-quality synthesis'],
          pricing: 'Free tier available, plans from $5/month'
        },
        {
          _id: '17',
          name: 'Gamma',
          description: 'AI-powered presentation and document creation',
          category: 'Productivity',
          url: 'https://gamma.app',
          isPremium: false,
          features: ['Auto-generated slides', 'Beautiful templates', 'Interactive content'],
          pricing: 'Free tier available'
        },
        {
          _id: '18',
          name: 'Framer AI',
          description: 'AI-powered website design and prototyping tool',
          category: 'Design',
          url: 'https://framer.com',
          isPremium: false,
          features: ['AI website generation', 'No-code design', 'Responsive layouts'],
          pricing: 'Free tier available, plans from $5/month'
        },
        {
          _id: '19',
          name: 'Zapier AI',
          description: 'AI-powered automation and workflow creation',
          category: 'Automation',
          url: 'https://zapier.com',
          isPremium: false,
          features: ['Smart automation', 'AI suggestions', 'App integrations'],
          pricing: 'Free tier available, plans from $19.99/month'
        },
        {
          _id: '20',
          name: 'Canva AI',
          description: 'AI-enhanced design platform for graphics and presentations',
          category: 'Design',
          url: 'https://canva.com',
          isPremium: false,
          features: ['AI image generation', 'Smart templates', 'Background removal'],
          pricing: 'Free tier available, Pro from $14.99/month'
        },
        {
          _id: '21',
          name: 'Descript',
          description: 'AI-powered audio and video editing with text-based editing',
          category: 'Video/Image',
          url: 'https://descript.com',
          isPremium: false,
          features: ['Transcription', 'Text-based editing', 'Voice cloning'],
          pricing: 'Free tier available, plans from $12/month'
        },
        {
          _id: '22',
          name: 'Hugging Face',
          description: 'Open-source platform for AI models and datasets',
          category: 'Development',
          url: 'https://huggingface.co',
          isPremium: false,
          features: ['Model hub', 'Datasets', 'Spaces for demos'],
          pricing: 'Free tier available, Pro from $9/month'
        }
      ];

      res.json(fallbackTools);
    } catch (error) {
      console.error('Tools error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
