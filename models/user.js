'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      user.belongsTo(models.role, {
        foreignKey: 'roleID',
      })
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 20]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['male', 'female', 'Male', 'Female']
          ],
          msg: "Must be Male or Female"
        }
      }
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    password: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};