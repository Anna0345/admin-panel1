'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('password1', 10);
    const hashedPassword2 = await bcrypt.hash('password2', 10);

    await queryInterface.bulkInsert('users', [
      {
        email: 'anna.ser@example.com',
        password: hashedPassword1,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'lina.smile@example.com',
        password: hashedPassword2,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};

