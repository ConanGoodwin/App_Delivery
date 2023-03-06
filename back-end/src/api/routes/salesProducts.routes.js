const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const salesProductsController = require('../controllers/salesProducts.controller')

const salesRouter = Router();

salesRouter
  .post('/register', salesProductsController.addProductSales);

salesRouter.get('/:id', salesProductsController.getSalesId)

module.exports = salesRouter;