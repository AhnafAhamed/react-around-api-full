const Cards = require('../models/cards');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Server Error' });
    });
};

const getCardById = (req, res) => {
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card Not Found' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
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

const deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Page Not Found' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request Error' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

const addLike = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

const removeLike = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Bad Request Error' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};
module.exports = {
  getCards, getCardById, createCard, deleteCard, addLike, removeLike,
};
