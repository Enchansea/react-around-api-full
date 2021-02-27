const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = 'thisisareallyimportantsecret';
const SALT_ROUND = 10;

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(400).send(err));

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'No such user found' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

// eslint-disable-next-line consistent-return
const createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  if (!password || !email) return res.status(400).send({ message: 'invalid data' });
  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: err });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { name: req.params.name, about: req.params.about })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err);
      }
      res.status(500).send(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: 604800 });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err });
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  login,
};
