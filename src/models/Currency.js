const { DataTypes } = require('sequelize');
const { sequelize } = require('./databases');

const Currency = sequelize.define('Currency', {
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,            
    validate: { notEmpty: true }
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: { notEmpty: true }
  }
}, { tableName: 'currencies', timestamps: true });

module.exports = Currency;
