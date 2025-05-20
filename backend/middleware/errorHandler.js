const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'ValidationError',
      message: err.message,
      details: err.errors
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'AuthError',
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'AuthError',
      message: 'Token expired'
    });
  }

  res.status(500).json({
    success: false,
    error: 'ServerError',
    message: 'Something went wrong'
  });
};