'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      furnitureCategoryId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Categories', // Update with the actual table name of FurnitureCategory
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};

