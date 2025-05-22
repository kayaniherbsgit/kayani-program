const User = require('../models/User');

// GET answers for a lesson
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

// PUT answers for a lesson
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

module.exports = {
  getAnswers,
  saveAnswers
};
