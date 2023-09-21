const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'MUST_PROVIDE_USERNAME'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'MUST_PROVIDE_EMAIL'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'MUST_PROVIDE_PASSWORD']
  },
});

const UserModel = model('User', userSchema);

module.exports = UserModel;