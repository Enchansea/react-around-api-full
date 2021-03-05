const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');
const User = require('../models/user');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const BadRequestError = require('../middlewares/errors/BadRequestError');

// const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUND = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  console.log('req.params.id', req.params.id);
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('user not found');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  console.log('getCurrentUser', req.user._id);
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user._doc);
      } else {
        throw new NotFoundError('User does not exist');
      }
    })
    .catch((err) => {
      console.log('err!!', err);
      next(err);
    });
};

// eslint-disable-next-line consistent-return
const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  console.log('signup backend');
  if (!password || !email) {
    throw new BadRequestError('invalid data');
  }
  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        .then((user) => {
          if (!user) {
            throw new BadRequestError('invalid data');
          } res.status(201).send({
            _id: user._id,
            email: user.email,
          });
        })
        .catch(next);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { name: req.params.name, about: req.params.about })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('user not found');
      } res.send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  console.log('login');
  const { email, password } = req.body;

  if (!isEmail(email)) {
    throw new NotFoundError('incorrect email or password');
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('incorrect email or password');
      }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: 604800 });
      res.cookie('jwt', token, {
        maxAge: 360000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log('err =>>>>>>>>', err);
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  login,
  getCurrentUser,
};

// NODE_ENV === 'production' ? JWT_SECRET : 'Fd5Ic7sEcREtcOde'
