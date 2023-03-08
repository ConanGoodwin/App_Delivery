const { salesProducts } = require('../../database/models');

const addProductSales = async (reqBody) => {
  const { saleId, productId, quantity } = reqBody;

  const message = await salesProducts
   .create({ saleId, productId, quantity });

  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'seller product not found' };
};

const getById = async (saleId) => {
  const message = await salesProducts.findAll({ where: { saleId } });
  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Not found seller product' };
};

module.exports = {
  addProductSales,
  getById,
};