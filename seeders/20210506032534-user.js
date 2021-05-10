'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('users', [{
      name: 'Cahya Nugroho',
      email :'cahya@skyshi.com',
      gender:'male',
      phonenumber:'+6281340883',
      password:'$2b$10$DB.w1gHkosYLRCpI36UeMuQpa5ev4fYAYLHXqYpvyLvbQGYsMxzna',
      roleID:'admin',
      activeStatus:true,
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
     await queryInterface.bulkDelete('users', null, {});
  }
};