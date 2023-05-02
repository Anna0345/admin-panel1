const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});

const FurnitureCategory = sequelize.define('FurnitureCategory', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

module.exports = FurnitureCategory;
