const rateLimit = require('express-rate-limit');
const config = require('../config/config');

const authLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW,
  max: 5,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
});

module.exports = { authLimiter };