const { DataTypes } = require('sequelize');
const { sequelize } = require('./databases');

const ExchangeRate = sequelize.define('ExchangeRate', {
  base: {                 
    type: DataTypes.STRING(10),
    allowNull: false
  },
  quote: {                
    type: DataTypes.STRING(10),
    allowNull: false
  },
  rate: {                
    type: DataTypes.DECIMAL(18, 8),
    allowNull: false
  },
  effectiveAt: {         
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'exchange_rates',
  indexes: [
    { fields: ['base', 'quote', 'effectiveAt'] }
  ],
  timestamps: true
});

module.exports = ExchangeRate;
