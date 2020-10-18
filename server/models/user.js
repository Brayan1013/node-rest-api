const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validRole = {
  values: ['USER_ROLE', 'SUPER_ROLE'],
  message: '{VALUE} is not valid',
};

const User = new Schema({
  name: { type: String, required: [true, 'We need this field name'] },
  email: {
    type: String,
    required: [true, 'We need a valid email'],
  },
  password: {
    type: String,
    required: [true, 'The field password is required'],
  },
  img: { type: String },
  role: { type: String, default: 'USER_ROLE', enum: validRole },
  state: { type: String, default: true },
  google: { type: Boolean, default: false },
});

User.path('email').validate(function (value, respond) {
  return mongoose
    .model('User')
    .countDocuments({ email: value })
    .exec()
    .then(function (count) {
      if (count !== 0) {
        return false;
      } else {
        return true;
      }
    })
    .catch(function (err) {
      throw err;
    });
}, 'Email already exists.');

User.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

module.exports = mongoose.model('User', User);
