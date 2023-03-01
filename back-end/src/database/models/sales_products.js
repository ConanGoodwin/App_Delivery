'use strict';
module.exports = (sequelize, DataTypes) => {
 const salesProducts = sequelize.define('salesProducts', {
  saleId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true

  },
  quantity: {
    type: DataTypes.INTEGER
  },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'salesProducts'
  });

  salesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProducts,
      foreignKey: 'saleId',
      otherKey: 'productsId'
    });
    
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProducts,
      foreignKey: 'saleId', 
      otherKey: 'productsId' 
    });
  }

  return salesProducts;
};