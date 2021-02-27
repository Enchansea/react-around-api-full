const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;
const cardRouter = require('./routers/cards.js');
const userRouter = require('./routers/users.js');
const {
  login, createUser
} = require('./controllers/users.js');

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use('/', cardRouter);
app.use('/', userRouter);
app.use(helmet());

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'An error occurred on the server' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.post('/signin', login);
app.post('/signup', createUser);
