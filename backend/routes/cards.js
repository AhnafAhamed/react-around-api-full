const router = require('express').Router();

const {
  getCards, createCard, deleteCard, getCardById, addLike, removeLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.get('/cards/:cardId', getCardById);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.patch('/cards/:cardId/likes', addLike);

router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
