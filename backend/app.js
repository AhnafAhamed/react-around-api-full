const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const app = express();
const { requestLogger, errorLogger } = require('./middleware/logger');
const validateUrl = require('./utils/validateUrl');
const users = require('./routes/users');
const { createCard } = require('./controllers/cards');
const cards = require('./routes/cards');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(cors());
app.options('*', cors());
app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);
app.use('/', users);
app.use('/', cards);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
  next();
});

app.post('/cards', auth, createCard);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
