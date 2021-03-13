const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard, addLike, removeLike } = require('../controllers/cards.js');

cardRouter.get('/cards', getCards);

// switched to joi celebrate to protect routes
cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), createCard);

cardRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

cardRouter.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), addLike);

cardRouter.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), removeLike);

// original routers
// cardRouter.post('/cards', createCard);
// cardRouter.delete('/cards/:cardId', deleteCard);
// cardRouter.put('/likes/:cardId', addLike);
// cardRouter.delete('/likes/:cardId', removeLike);

module.exports = cardRouter;
