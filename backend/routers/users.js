const express = require('express');

const userRouter = express.Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUsers, updateUser, getCurrentUser, updateAvatar,
} = require('../controllers/users.js');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required.email(),
  }),
}), getCurrentUser);

userRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length24.required(),
  }),
}), getUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateAvatar);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required.min(2).max(30),
    about: Joi.string().required.min(2).max(30),
  }),
}), updateUser);

// userRouter.get('/users/me', getCurrentUser);
// userRouter.get('/users/:id', getUser);
// userRouter.patch('/users/me/avatar', updateAvatar);
// userRouter.patch('/users/me', updateUser);

module.exports = userRouter;
