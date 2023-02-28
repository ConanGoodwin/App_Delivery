const errorMiddleware = require('./error.middleware');
const validateBodyUser = require('./validateBodyUser.middleware');

module.exports = {
  errorMiddleware,
  validateBodyUser,
};