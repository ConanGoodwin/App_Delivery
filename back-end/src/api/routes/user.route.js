const { Router } = require('express');
const UserController = require('../controllers/user.controller');
// const { validateBodyUser } = require('../middlewares');
// const validateJWT = require('../auth/validateJWT');

const userRouter = Router();

// userRouter.post('/', validateBodyUser, userController.insert);
userRouter.get('/', UserController.getAll);
userRouter.get('/login', UserController.login);
// userRouter.get('/:id', validateJWT, userController.getById);

module.exports = userRouter;