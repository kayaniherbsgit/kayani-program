const rateLimit = require('express-rate-limit');
const config = require('../config/config');

// Rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW,
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  },
  skip: (req) => {
    // Skip rate limiting for certain conditions if needed
    return false;
  }
});

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW,
  max: config.RATE_LIMIT_MAX,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
});

module.exports = {
  authLimiter,
  apiLimiter
};