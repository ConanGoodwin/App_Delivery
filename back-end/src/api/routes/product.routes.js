const { Router } = require('express');
const ProductController = require('../controllers/product.controller');
// const validadeBody = require('../middlewares/validateBodyUser.middleware');

const productRouter = Router();

productRouter.get('/', ProductController.getAll);

module.exports = productRouter;