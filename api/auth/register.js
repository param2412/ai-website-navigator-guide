const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      console.log('Registration attempt:', { email: req.body.email, name: req.body.name });
      
      const { email, password, name } = req.body;
      
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Try database connection first (if available)
      let user = null;
      let isDemo = false;
      
      try {
        // Database connection code would go here
        // For now, we'll use demo mode
        throw new Error('Database not available');
      } catch (dbError) {
        console.log('Database error, using demo mode for registration:', dbError.message);
        
        // Demo registration - create a demo user
        user = {
          _id: 'demo-user-' + Date.now(),
          email: email,
          name: name,
          password: await bcrypt.hash(password, 10)
        };
        isDemo = true;
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'demo-secret-key',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          isDemo
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
