'use strict';

const {Sequelize, DataTypes }= require('sequelize');
const users = require('./users-models');

// will make dynamic for testing environment.
const DATABASE_URL = process.env.DATABASE_URL === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

// Database singleton
const SequelizeDatabase =  new Sequelize(DATABASE_URL, {});

const userModel = users(SequelizeDatabase, DataTypes);

module.exports = {
  SequelizeDatabase,
  userModel,
}