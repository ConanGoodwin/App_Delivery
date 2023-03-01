'use strict';
module.exports = (sequelize, DataTypes) => {
const product = sequelize.define('products', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: { type: DataTypes.STRING },
  price: { type:DataTypes.DECIMAL },
  ulr_image: { type: DataTypes.STRING }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'products'
  });
  return product;
};