const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v, {require_tld: true, allow_utf8_local_part: false}),
      message: 'field "e-mail" must be a valid e-mail address',
    }
  },
  password: {
    type: String,
    reqired: true,
    validate: {
      validator: (v) => validator.isStrongPassword(v, {minlength: 8, minNumbers: 1, minSymbols: 1}),
      message:'Invalid password - minimum length: 8, minimum non alphanumeric characters: 1, min numbers: 1'
    },
    select: false
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau'
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer'
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'field "avatar" must be a valid url-address',
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg'
  }
});
userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
