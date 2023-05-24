`use strict`;
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { userModel } = require('../../models');

const basicAuth = async (req, res, next) => {
  let authorization = req.headers;
  /*
      req.headers.authorization is : "Basic am9objpmb28="
      To get username and password from this, take the following steps:
        - Turn that string into an array by splitting on ' '
        - Pop off the last value
        - Decode that encoded string so it returns to user:pass
        - Split on ':' to turn it into an array
        - Pull username and password from that array
    */

  let authString = authorization.split(' ')[1];
  console.log('authString:', authString);

  let decodedAuthString = base64.decode(authString);
  console.log('decodedAuthString:', decodedAuthString);

  let [username, password] = decodedAuthString.split(':');

  let user = await userModel.findOne({ where: { username } });
  // console.log('here.........user:', user);
  if (user) {
    let validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      req.user = user;
      next();
    } else {
      next('Not authorized (incorrect password)');
    }
  } else {
    next('Not authorized (user doesn\'t exist in DB)');
  }
};

module.exports = basicAuth;
