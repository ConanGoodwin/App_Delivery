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
  urlImage: {
      type: DataTypes.STRING,
      field: 'url_image',
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'products'
  });
  return product;
};