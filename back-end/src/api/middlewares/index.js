const errorMiddleware = require('./error.middleware');
const { 
  validateBodyLogin, validateBodyRegister, validateEmail, validateLength, validateBodyAdm,
} = require('./validateBodyUser.middleware');

module.exports = {
  errorMiddleware,
  validateBodyLogin,
  validateBodyRegister,
  validateBodyAdm,
  validateEmail,
  validateLength,
};