'use strict';

const {Sequelize, DataTypes }= require('sequelize');
const userSchema = require('./user');

// will make dynamic for testing environment.
const DATABASE_URL = process.env.DATABASE_URL === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

// Database singleton
const SequelizeDatabase =  new Sequelize(DATABASE_URL, {});

const Users = userSchema(SequelizeDatabase, DataTypes);

module.exports = {
  SequelizeDatabase,
  Users,
};