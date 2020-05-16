const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {

  // get jwt token from header
  const token = req.header('x-auth-token')

  // if there is no token
  if(!token){
    res.status(401).json({ msg: 'No Token: Authorisation Denied'})
  }

  // verify token matched jwt
  try {

    // pass in token and scret to verify function
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // payload is returned by verify, set the request user as the user id in the jwt
    req.user = decoded.user

    // next function
    next();

  } catch (error) {
    res.status(401).json({ msg : 'Token not valid'})
  }
}
 