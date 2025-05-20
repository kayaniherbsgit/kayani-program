const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/auth'); // Add this line
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, avatarUrl } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Create new user
    const user = new User({ username, password, avatarUrl });
    await user.save();
    
    // Return success message without logging in
    res.status(201).json({ 
      message: 'Registration successful! Please login with your credentials.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        completedLessons: user.completedLessons,
        lessonProgress: user.lessonProgress,
        lastAccessed: user.lastAccessed
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Add this to your authRoutes.js
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Here you could add server-side session invalidation if needed
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
});

// Logout route
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Here you could add server-side session invalidation if needed
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
});

module.exports = router;