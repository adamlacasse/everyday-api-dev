'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_date: {
        type: Sequelize.DATE
      },
      post_img: {
        type: Sequelize.STRING
      },
      post_title: {
        type: Sequelize.STRING
      },
      post_text: {
        type: Sequelize.STRING
      },
      list_group1: {
        type: Sequelize.STRING
      },
      list_group2: {
        type: Sequelize.STRING
      },
      list_group3: {
        type: Sequelize.STRING
      },
      mood: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};