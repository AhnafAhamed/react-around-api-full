const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const getUsers = (req, res) => {
  Users.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server Error' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'JWT Token', {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUserById = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not Found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
};

const createUser = (req, res) => {
  const {
    name, about, email, password, avatar,
  } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({
      name,
      about,
      email,
      password: hash,
      avatar,
    }))

    .then((user) => res.status(200).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      email: user.email,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Internal Server Errors' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
