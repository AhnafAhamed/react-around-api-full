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

const getUserById = (req, res) => {
  Users.findById(req.params.cardId)
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
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
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
  Users.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
};
