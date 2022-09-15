'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      gameplayed: {
        type: Sequelize.INTEGER
      },
      win: {
        type: Sequelize.INTEGER
      },
      forxcage: {
        type: Sequelize.INTEGER
      },
      freexcage: {
        type: Sequelize.INTEGER
      },
      twoxcage: {
        type: Sequelize.INTEGER
      },
      onexcage: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};