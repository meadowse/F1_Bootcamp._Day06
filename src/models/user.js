'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    gameplayed: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    forxcage: DataTypes.INTEGER,
    freexcage: DataTypes.INTEGER,
    twoxcage: DataTypes.INTEGER,
    onexcage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};