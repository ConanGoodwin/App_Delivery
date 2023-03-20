const salesService = require('../services/sales.service');
const { returnController } = require('../utils/returnServicesControllers');

const addProductSales = async (req, res) => {
  const { userId, sellerId, 
    totalPrice, 
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status } = req.body;

  const { type, message } = await salesService
    .addProductSales({ 
      userId, 
      sellerId, 
      totalPrice, 
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
      });

  if (type) return res.status(404).json({ message });

  returnController(res, type, message, 201);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAll();

  returnController(res, type, message, 200);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.updateSale(id, req.body);

  returnController(res, type, message, 200);
};

module.exports = {
  addProductSales,
  getAllSales,
  getSalesId,
};