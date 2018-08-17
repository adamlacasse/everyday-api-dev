'use strict';
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('Posts', {
    post_img: DataTypes.STRING, 
    post_title: DataTypes.STRING,
    post_text: DataTypes.STRING,
    list_group1: DataTypes.STRING,
    list_group2: DataTypes.STRING,
    list_group3: DataTypes.STRING,
    mood: DataTypes.STRING
  }, {});
  Posts.associate = function(models) {
    // associations can be defined here
    Posts.associate = (models) => {
      Posts.belongsTo(models.Author, {
          foreignKey: {
              allowNull: false
          }
      });
  };
  };
  return Posts;
};