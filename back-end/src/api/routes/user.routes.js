const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const UserController = require('../controllers/user.controller');
const {
  validateBodyRegister, validateBodyLogin, validateEmail, validateLength, 
} = require('../middlewares');

const userRouter = Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/validate', validateJWT, UserController.validateToken);
userRouter
  .post('/register', validateBodyRegister, validateEmail, validateLength, UserController.create);
userRouter.post('/login', validateBodyLogin, validateEmail, validateLength, UserController.login);

module.exports = userRouter;
