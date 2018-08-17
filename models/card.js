'use strict';
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define('Card', {
    card_img_top: DataTypes.STRING,
    card_title: DataTypes.STRING,
    card_text: DataTypes.STRING,
    list_group1: DataTypes.STRING,
    list_group2: DataTypes.STRING,
    list_group3: DataTypes.STRING
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
  };
  return Card;
};