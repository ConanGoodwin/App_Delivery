const ProductService = require('../services/product.service');
const { returnController } = require('../utils/returnServicesControllers');

const getAll = async (_req, res) => {
  const { type, message } = await ProductService.getAll();

  returnController(res, type, message, 200);
};

module.exports = {
  getAll,
};
