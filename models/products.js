const Sequelize = require('sequelize');
const config = require('../config/config.json'); // Your Sequelize configuration file
const FurnitureCategory = require('./furnitureCategory'); // Require the FurnitureCategory model


const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
  });
  
const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true

  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Add foreign key for the FurnitureCategory relationship
  furnitureCategoryId: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: FurnitureCategory,
      key: 'id'
    }
  },
  price: {
    type: Sequelize.FLOAT,
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

// Define the one-to-many relationship between Product and FurnitureCategory
Product.belongsTo(FurnitureCategory, { foreignKey: 'furnitureCategoryId' });
FurnitureCategory.hasMany(Product, { foreignKey: 'furnitureCategoryId' });

module.exports = Product;
