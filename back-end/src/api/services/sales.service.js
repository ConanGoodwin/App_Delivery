const { sales } = require('../../database/models');

const addProductSales = async (reqBody) => {
  const { totalPrice, deliveryAddress, deliveryNumber, saleDate, status } = reqBody;

  const message = await sales
   .create({ totalPrice, deliveryAddress, deliveryNumber, saleDate, status });

  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Product not found' };
};

const getAll = async () => {
  const message = await sales.findAll();
  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Not found seller' };
};


const updateSale = async (id, reqBody) => {
  const sales = await salesProducts.findByPk(id);
  const { totalPrice, deliveryAddress, deliveryNumber, saleDate, status } = reqBody;
  const message = await sales
    .update({ totalPrice, deliveryAddress, deliveryNumber, saleDate, status })
  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Not found seller product' };
};

module.exports = {
  addProductSales,
  getAll,
  updateSale
};