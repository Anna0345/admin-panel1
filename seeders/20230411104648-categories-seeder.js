'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { 
        id:"Kitchen",
        name: 'Kitchen',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id:"Chairs",
        name: 'Chairs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id:"Bedroom",
        name: 'Bedroom',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};

