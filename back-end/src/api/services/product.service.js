const { products } = require('../../database/models');

const getAll = async () => {
  const message = await products.findAll();

  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAll,
};