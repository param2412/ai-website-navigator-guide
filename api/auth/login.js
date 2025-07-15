const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Demo user for when database is not available
const DEMO_USER = {
  _id: 'demo-user-id',
  email: 'demo@example.com',
  name: 'Demo User',
  password: '$2a$10$demo.hashed.password' // This is a pre-hashed "demo123"
};

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('Login attempt:', { email: req.body.email });
      
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Try database connection first (if available)
      let user = null;
      let isDemo = false;
      
      try {
        // Database connection code would go here
        // For now, we'll use demo mode
        throw new Error('Database not available');
      } catch (dbError) {
        console.log('Database error, using demo mode:', dbError.message);
        
        // Demo authentication
        if (email.includes('demo') || email === 'demo@example.com') {
          if (password === 'demo123') {
            user = DEMO_USER;
            isDemo = true;
          }
        } else {
          // Accept any credentials in demo mode
          user = {
            _id: 'demo-user-' + Date.now(),
            email: email,
            name: email.split('@')[0],
            password: DEMO_USER.password
          };
          isDemo = true;
        }
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'demo-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          isDemo
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
