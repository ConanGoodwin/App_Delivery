const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const UserController = require('../controllers/user.controller');
const {
  validateBodyRegister, validateBodyLogin, validateEmail, validateLength, validateBodyAdm,
} = require('../middlewares');

const admRouter = Router();

admRouter.get('/', UserController.getAll);
admRouter.get('/validate', validateJWT, UserController.validateToken);
admRouter
  .post(
      '/register', 
      validateBodyRegister, validateBodyAdm, validateEmail, validateLength, 
      validateJWT, UserController.createAdm,
    );
admRouter.post('/login', validateBodyLogin, validateEmail, validateLength, UserController.login);

module.exports = admRouter;