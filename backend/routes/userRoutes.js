const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/auth');
const {
  getAnswers,
  saveAnswers
} = require('../controllers/userController');

const router = express.Router();

// Normal user progress routes
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

// ✅ Day 2 assignment routes
router.get('/answers', authenticate, getAnswers);
router.put('/answers', authenticate, saveAnswers);

// 🔐 ADMIN ROUTES BELOW
router.get('/admin/users', authenticate, async (req, res) => {
  const admin = await User.findById(req.userId);
  if (!admin || !admin.isAdmin) return res.status(403).json({ message: 'Access denied' });

  const users = await User.find({}, 'username avatarUrl completedLessons lessonProgress lastAccessed createdAt');
  res.json(users);
});

router.get('/admin/user/:id', authenticate, async (req, res) => {
  const admin = await User.findById(req.userId);
  if (!admin || !admin.isAdmin) return res.status(403).json({ message: 'Access denied' });

  const user = await User.findById(req.params.id, 'username avatarUrl completedLessons lessonProgress lastAccessed');
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user);
});

router.delete('/admin/user/:id', authenticate, async (req, res) => {
  const admin = await User.findById(req.userId);
  if (!admin || !admin.isAdmin) return res.status(403).json({ message: 'Access denied' });

  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.status(404).json({ message: 'User not found' });

  res.json({ message: 'User deleted successfully' });
});

module.exports = router;