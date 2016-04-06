'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    posx: DataTypes.FLOAT,
    posy: DataTypes.FLOAT,
    title: DataTypes.STRING,
    info: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Location.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Location;
};