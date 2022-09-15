'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING,
        validate: {
          notIn: [['Users', 'login']]
        }
      },
      password: {
        type: Sequelize.STRING
      },
      gamesPlayed: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      win: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      winRate: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      forxcage: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      freexcage: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      twoxcage: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      onexcage: {
        defaultValue: 0,
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
    await queryInterface.dropTable('Users');
  }
};