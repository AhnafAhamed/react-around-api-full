const Cards = require('../models/cards');
const AuthorizationError = require('../errors/auth-error');
const NotFoundError = require('../errors/not-found-error');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const getCardById = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not available');
      } else {
        return res.status(200).send(card);
      }
    })
    .catch(next);
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

const deleteCard = (req, res, next) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      } else if (card.owner.toString() !== req.user._id) {
        throw new AuthorizationError('User not authorized');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};
module.exports = {
  getCards, getCardById, createCard, deleteCard, addLike, removeLike,
};
