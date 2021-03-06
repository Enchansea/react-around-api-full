const Card = require('../models/card');
const BadRequestError = require('../middlewares/errors/BadRequestError');
const NotFoundError = require('../middlewares/errors/NotFoundError');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(err));

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('invalid data for creating card');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('card not found');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  const user = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.likes.includes(user)) {
        throw new NotFoundError('already liked');
      }
      Card.findByIdAndUpdate(card._id,
        { $addToSet: { likes: user } },
        { new: true, runValidators: true })
        // eslint-disable-next-line no-shadow
        .then((card) => res.send(card));
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  const user = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card.likes.includes(user)) {
        throw new NotFoundError('not liked');
      }
      Card.findByIdAndUpdate(card._id,
        { $pull: { likes: user } },
        { new: true })
        // eslint-disable-next-line no-shadow
        .then((card) => res.send(card));
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
