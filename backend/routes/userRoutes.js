const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get user progress
router.get('/progress', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      completedLessons: user.completedLessons,
      lessonProgress: user.lessonProgress,
      lastAccessed: user.lastAccessed
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
});

// Update user progress
router.put('/progress', authenticate, async (req, res) => {
  try {
    const { completedLessons, lessonProgress, lastAccessed } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { completedLessons, lessonProgress, lastAccessed },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      completedLessons: user.completedLessons,
      lessonProgress: user.lessonProgress,
      lastAccessed: user.lastAccessed
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
});

module.exports = router;