const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const AuthorizationError = require('../errors/auth-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  Users.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('User not authorized');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.status(200).send({ jwt: token });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('User not authorized');
      } else {
        return res.status(200).send(user);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, email, password, avatar,
  } = req.body;
  Users.findOne({ email })
    .then((userExists) => {
      if (userExists) {
        throw new ConflictError('The email you are trying to signup is used already');
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => Users.create({
          name,
          about,
          email,
          password: hash,
          avatar,
        }))
        .then((user) => res.status(200).send(user));
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  Users.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User does not exist');
      } else {
        res.status(200).send(user);
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User does not exist');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User does not exist');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  getCurrentUser,
  updateAvatar,
  login,
};
