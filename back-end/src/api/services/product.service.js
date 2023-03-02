const { Product } = require('../../database/models');

const getAll = async () => {
  const message = await Product.findAll();

  if (message) return { type: null, message };

  return { type: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAll,
};