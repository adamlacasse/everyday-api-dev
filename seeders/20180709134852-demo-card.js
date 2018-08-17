'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Cards', [{
        card_img_top: "img src='/img/new-hampshire.jpg",
        card_title: "New Hampshire",
        card_text: "A great place to live, unless you are retired",
        list_group1: "population: 789012",
        list_group2: "hike the state",
        list_group3: "last thing"
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Card', null, {});
  }
};
