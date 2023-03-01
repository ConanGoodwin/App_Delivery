const errorMiddleware = require('./error.middleware');
const { validateBody, validateEmail, validateLength } = require('./validateBodyUser.middleware');

module.exports = {
  errorMiddleware,
  validateBody,
  validateEmail,
  validateLength,
};