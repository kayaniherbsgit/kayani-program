const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/auth');
const {
  getAnswers,
  saveAnswers,
  getAllUsers,
  getSingleUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// ✅ Normal user progress routes
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

// 🔐 ADMIN ROUTES (refactored to use controller)
router.get('/admin/users', authenticate, getAllUsers);
router.get('/admin/user/:id', authenticate, getSingleUser);
router.delete('/admin/user/:id', authenticate, deleteUser);

module.exports = router;