'use strict';
module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'users'
  });

  User.associate = (models) => {
    User.hasMany(models.sales, {
      as: 'sales',
      foreignKey: 'userId',
    })
  }

  User.associate = (models) => {
    User.hasMany(models.sales, {
      as: 'sales',
      foreignKey: 'sellerId',
    });
  }
  return User;
};