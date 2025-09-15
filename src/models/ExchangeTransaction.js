const { DataTypes } = require('sequelize');
const { sequelize } = require('./databases');

const ExchangeTransaction = sequelize.define('ExchangeTransaction', {
  fromCurrency: { type: DataTypes.STRING(10), allowNull: false },
  toCurrency:   { type: DataTypes.STRING(10), allowNull: false },
  amount:       { type: DataTypes.DECIMAL(18, 8), allowNull: false },
  rateUsed:     { type: DataTypes.DECIMAL(18, 8), allowNull: false },
  resultAmount: { type: DataTypes.DECIMAL(18, 8), allowNull: false }
}, { tableName: 'exchange_transactions', timestamps: true });

module.exports = ExchangeTransaction;
