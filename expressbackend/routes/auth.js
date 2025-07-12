const express = require('express');
const { register, login, getProfile, updatePreferences, testEndpoint } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Test route
router.get('/test', testEndpoint);

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/preferences', auth, updatePreferences);

module.exports = router;
