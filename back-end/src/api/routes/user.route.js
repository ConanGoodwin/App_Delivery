const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { validateBody, validateEmail, validateLength } = require('../middlewares');
// const { validateBodyUser } = require('../middlewares');
// const validateJWT = require('../auth/validateJWT');

const userRouter = Router();

// userRouter.post('/', validateBodyUser, userController.insert);
userRouter.get('/', UserController.getAll);
userRouter.post('/register', validateBody, validateEmail, validateLength, UserController.create);
userRouter.post('/login', validateBody, validateEmail, validateLength, UserController.login);
// userRouter.get('/:id', validateJWT, userController.getById);

module.exports = userRouter;