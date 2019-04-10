const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')

const Users = require('../users/users-model.js');

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
   // roles: ['Student']
}

const options = {
  expiresIn: '1d'
}
return jwt.sign(payload, secrets.jwtSecrets, options)
}
// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}! we have a token`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials', token });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
