'use strict';

//load environment variables from the .env
require('dotenv').config();

const PORT = process.env.PORT || 3002;
 
const { SequelizeDatabase } = require('./src/auth/models');
const { start } =require('./src/server');


// make sure our tables are created, start up the HTTP server.
SequelizeDatabase.sync()
  .then(() => {
    app.listen(3000, () => console.log('server up'));
    start(PORT);
  }).catch(e => {
    console.error('Could not start server', e.message);
  });
