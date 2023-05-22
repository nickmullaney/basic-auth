require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
const router = require('./auth/routes');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());
// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(router);


app.get('/', (req, res, next) =>{
  res.status(200).send('Proof of Life');
});

const start = (port) => {
  app.listen(port, () => console.log('Server is running on ', port));
}

module.exports = {
  server: app,
  start,
}

