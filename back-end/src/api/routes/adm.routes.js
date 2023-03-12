const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const UserController = require('../controllers/user.controller');
const {
  validateBodyRegister, validateBodyLogin, validateEmail, validateLength, 
} = require('../middlewares');

const admRouter = Router();

admRouter.get('/', UserController.getAll);
admRouter.get('/validate', validateJWT, UserController.validadeToken);
admRouter
  .post('/register', validateBodyRegister, validateEmail, validateLength, UserController.create);
admRouter.post('/login', validateBodyLogin, validateEmail, validateLength, UserController.login);

module.exports = admRouter;