const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/progress', authenticate, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({
    completedLessons: user.completedLessons,
    lessonProgress: user.lessonProgress,
    lastAccessed: user.lastAccessed
  });
});

router.put('/progress', authenticate, async (req, res) => {
  const { completedLessons, lessonProgress, lastAccessed } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userId,
    { completedLessons, lessonProgress, lastAccessed },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ completedLessons, lessonProgress, lastAccessed });
});

module.exports = router;
