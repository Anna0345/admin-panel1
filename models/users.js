const Sequelize = require('sequelize');
const config = require('../config/config.json'); 


const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
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

module.exports = User;





