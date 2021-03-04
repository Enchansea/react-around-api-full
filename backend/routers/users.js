const express = require('express');

const userRouter = express.Router();

const {
  getUser, getUsers, updateUser,
} = require('../controllers/users.js');

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', updateUser);

module.exports = userRouter;
