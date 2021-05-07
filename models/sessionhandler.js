'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sessionHandler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sessionHandler.init({
    userID: DataTypes.STRING,
    email: DataTypes.STRING,
    loginAt: DataTypes.DATE,
    logoutAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sessionHandler',
  });
  return sessionHandler;
};