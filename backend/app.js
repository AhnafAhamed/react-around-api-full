const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();
const users = require('./routes/users');
const { createCard } = require('./controllers/cards');
const cards = require('./routes/cards');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // 61727c3dd4e185e6b9cfcc1d
  };

  next();
});

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', users);
app.use('/', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.post('/cards', auth, createCard);

app.use(auth);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
