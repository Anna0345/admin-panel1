'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get Category IDs
    const kitchenCategory = await queryInterface.rawSelect('Categories', { where: { name: 'Kitchen' } }, ['id']);
    const chairsCategory = await queryInterface.rawSelect('Categories', { where: { name: 'Chairs' } }, ['id']);
    const bedroomCategory = await queryInterface.rawSelect('Categories', { where: { name: 'Bedroom' } }, ['id']);

    await queryInterface.bulkInsert('Products', [
      {
        name: 'Kitchen Product 1',
        FurnitureCategoryId: kitchenCategory,
        price: 10.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kitchen Product 2',
        FurnitureCategoryId: kitchenCategory,
        price: 15.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chairs Product 1',
        FurnitureCategoryId: chairsCategory,
        price: 25.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chairs Product 2',
        FurnitureCategoryId: chairsCategory,
        price: 19.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bedroom Product 1',
        FurnitureCategoryId: bedroomCategory,
        price: 99.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bedroom Product 2',
        FurnitureCategoryId: bedroomCategory,
        price: 89.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

