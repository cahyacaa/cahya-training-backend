'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('users', [{
      name: 'Cahya Nugroho',
      email :'cahya@skyshi.com',
      gender:'Male',
      phonenumber:'+6281340883',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};