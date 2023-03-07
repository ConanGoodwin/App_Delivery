const salesProductsService = require('../services/salesProducts.service');
const { returnController } = require('../utils/returnServicesControllers');

const addProductSales = async (req, res) => {
  const { saleId, productId, quantity } = req.body;
  const { type, message } = await salesProductsService
    .addProductSales({ saleId, productId, quantity });

  if (type) return res.status(404).json({ message });

  returnController(res, type, message, 201);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesProductsService.getById(id);

  returnController(res, type, message, 200);
};

module.exports = {
  addProductSales,
  getSalesId,
};