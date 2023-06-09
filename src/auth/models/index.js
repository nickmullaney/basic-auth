'use strict';

// 3rd party requirements
const { Sequelize, DataTypes } = require('sequelize');
const user = require('./user');


// setup database url
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

// db singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);

// create model using the schema
const userModel = user(sequelizeDatabase, DataTypes);

module.exports = { sequelizeDatabase, userModel };
