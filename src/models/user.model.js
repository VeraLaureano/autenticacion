const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'MUST_PROVIDE_USERNAME'],
    unique: true,
    minLength: [3, 'MIN_LENGTH_3']
  },
  email: {
    type: String,
    required: [true, 'MUST_PROVIDE_EMAIL'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'MUST_PROVIDE_PASSWORD'],
    minLength: [8, 'MIN_LENGTH_8']
  },
});

const UserModel = model('User', userSchema);

module.exports = UserModel;