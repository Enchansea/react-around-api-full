const cardRouter = require('express').Router();
const { getCards, createCard, deleteCard, addLike, removeLike } = require('../controllers/cards.js');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/likes/:cardId', addLike);
cardRouter.delete('/likes/:cardId', removeLike);
module.exports = cardRouter;
