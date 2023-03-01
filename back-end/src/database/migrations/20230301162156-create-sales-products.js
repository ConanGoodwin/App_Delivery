'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};