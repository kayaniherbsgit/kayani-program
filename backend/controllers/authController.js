const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');

module.exports = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password, avatarUrl } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

const user = new User({
  username,
  password,
  avatarUrl: avatarUrl || "https://i.pravatar.cc/50"
});


      await user.save();

      res.status(201).json({ message: 'Registration successful! Please login with your credentials.' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  },

login: async (req, res) => {
  try {
    const { username, password } = req.body;

    // 🎯 HARD-CODED ADMIN CREDENTIALS
    if (username === 'kayaniadmin' && password === '#Kayani2025') {
      // Check if admin exists in DB
      let admin = await User.findOne({ username });

      // If not, create it
      if (!admin) {
        admin = new User({
          username,
          password,
          isAdmin: true,
          avatarUrl: "https://i.pravatar.cc/50"
        });
        await admin.save();
      }

      // Generate token for admin
      const token = jwt.sign(
        { userId: admin._id, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.json({
        token,
        user: {
          id: admin._id,
          username: admin.username,
          avatarUrl: admin.avatarUrl,
          isAdmin: true
        }
      });
    }

    // 🧍‍♂️ Regular User Login
    const user = await User.findOne({ username }).select('+password');
   if (!user) {
    
  // ✅ AUTO-CREATE admin if not found
  if (username === 'kayaniadmin' && password === '#Kayani2025') {
    const newAdmin = new User({
      username: 'kayaniadmin',
      password: '#Kayani2025',
      avatarUrl: "https://i.pravatar.cc/50",
      isAdmin: true
    });
    await newAdmin.save();
    return res.status(201).json({ message: 'Admin created. Please login again.' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}


    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.password = undefined;

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        completedLessons: user.completedLessons,
        lessonProgress: user.lessonProgress,
        lastAccessed: user.lastAccessed,
        isAdmin: user.isAdmin || false
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
}
,

  logout: async (req, res) => {
    try {
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
  }
};
