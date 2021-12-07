const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();

const { PORT = 3000 } = process.env;

const app = express();
const users = require('./routes/users');
const cards = require('./routes/cards');

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
app.use('/', users);
app.use('/', cards);
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});

module.exports = router;
