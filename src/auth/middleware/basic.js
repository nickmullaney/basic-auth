const base64 = require('base-64');
const { users } = require('../models/users')

async function basicAuth(req, res, next) {
  if(!req.headers.authorization){
    return res.status( 401).send('Unauthorized');
  }

  
}