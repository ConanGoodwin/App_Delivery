const { sales } = require('../../database/models');

const addProductSales = async (reqBody) => {
  const { userId, sellerId, totalPrice, deliveryAddress } = reqBody;
  const { deliveryNumber, saleDate, status } = reqBody;

  const message = await sales
   .create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });

  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Product not found' };
};

const getAll = async () => {
  const message = await sales.findAll();
  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Not found seller' };
};

module.exports = {
  addProductSales,
  getAll,
};
