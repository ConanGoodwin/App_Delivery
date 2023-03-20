const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const UserController = require('../controllers/user.controller');
const {
  validateBodyRegister, validateEmail, validateLength, validateBodyAdm,
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
admRouter.delete('/user/:id', UserController.exclude);

module.exports = admRouter;