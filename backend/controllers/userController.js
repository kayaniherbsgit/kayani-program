const User = require('../models/User');

// ✅ GET answers for a lesson
const getAnswers = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ lessonAnswers: user.lessonAnswers || {} });
  } catch (err) {
    console.error('GET /answers error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ PUT answers for a lesson
const saveAnswers = async (req, res) => {
  const { lessonNumber, answers } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.lessonAnswers) {
      user.lessonAnswers = {};
    }

    user.lessonAnswers[lessonNumber] = answers;
    await user.save();

    res.json({ message: 'Answers saved successfully' });
  } catch (err) {
    console.error('PUT /answers error:', err);
    res.status(500).json({ message: 'Failed to save answers' });
  }
};

// ✅ ADMIN: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username avatarUrl completedLessons lessonProgress lastAccessed createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// ✅ ADMIN: Get one user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, 'username avatarUrl completedLessons lessonProgress lastAccessed');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

// ✅ ADMIN: Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = {
  getAnswers,
  saveAnswers,
  getAllUsers,
  getSingleUser,
  deleteUser
};
