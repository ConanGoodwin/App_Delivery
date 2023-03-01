const errorMiddleware = require('./error.middleware');
const { validateBodyLogin, validateBodyRegister, validateEmail, validateLength } = require('./validateBodyUser.middleware');

module.exports = {
  errorMiddleware,
  validateBodyLogin,
  validateBodyRegister,
  validateEmail,
  validateLength,
};