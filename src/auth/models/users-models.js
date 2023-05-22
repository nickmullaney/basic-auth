'use strict';

const { DataTypes } = require("sequelize");

module.exports = (SequelizeDatabase, DataTypes)

return SequelizeDatabase.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(
      ['admin', 'editor', 'writer', 'user']),
    unique: true
  },
  email: {
    type: DataTypes.STRING,  
    unique: true,
  },
});