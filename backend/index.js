/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const cardRouter = require('./routers/cards.js');
const userRouter = require('./routers/users.js');
const { login, createUser } = require('./controllers/users.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./middlewares/errors/NotFoundError');

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', cardRouter);
app.use('/', userRouter);
app.get('*', (req, res) => {
  throw new NotFoundError('Requested resource not found');
});
app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500 ? 'An error occured on the server' : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
