const express = require('express');

const userRouter = express.Router();

const {
  getUser, getUsers, updateUser, getCurrentUser,
} = require('../controllers/users.js');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:id', getUser);

userRouter.patch('/users/me', updateUser);

module.exports = userRouter;
