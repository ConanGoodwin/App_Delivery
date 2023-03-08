'use strict';
module.exports = (sequelize, DataTypes) => {
 const Sales = sequelize.define('sales', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    type: DataTypes.INTEGER,
    // field: user_id
  },  
  sellerId: {
    type: DataTypes.INTEGER,
    // field: seller_id
  },
  totalPrice: {
    type: DataTypes.NUMBER
  },
  deliveryAddress: {
    type: DataTypes.STRING
  },
  deliveryNumber: {
    type: DataTypes.STRING
  },
  saleDate: { 
    type: DataTypes.DATE,
    defaultValue: new Date() 
  },
  status: {
    type: DataTypes.STRING
  },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'sales'
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    })
  }

  Sales.associate = (models) => {
    Sales.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'sellerId',
    });
  }

  return Sales;
};
