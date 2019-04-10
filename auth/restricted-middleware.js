const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token){
    // is the token valid?
    jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
      if(err){
        res.status(401).json({ you: "can't touch this!"})
      }else {
        req.decodedJWT = decodedToken;
        console.log("decoded token", req.dcodedJWT);
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
