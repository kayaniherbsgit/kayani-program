const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, default: "https://i.pravatar.cc/50" },
  completedLessons: { type: [Number], default: [] },
  lessonProgress: { type: Object, default: {} },
  lastAccessed: { type: Number, default: null },
  isAdmin: { type: Boolean, default: false },
  lessonAnswers: { type: Object, default: {} } // ✅ Answers to daily lesson questions
}, { timestamps: true });

// 🔒 Hash password before save (only if modified)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Compare passwords on login
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
