const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const salesController = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter
  .post('/register', validateJWT, salesController.addProductSales);

salesRouter.get('/', salesController.getAllSales);

salesRouter
  .put('/update/:id', validateJWT, salesController.getSalesId);

module.exports = salesRouter;