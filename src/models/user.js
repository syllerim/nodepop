'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

/**
 * User Scheme
 * @prop name
 * @prop email
 * @prop key
 */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (v) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(v);
    }
  },
  key: {
    type: String,
    unique: false,
    required: true
  }
});

userSchema.index({
  name: 1, email: 1
});

/**
 * User - Save User
 * @param user
 * This method receives an user and before storing it on the database
 * create a hash for the password using  the library bcrypt-nodejs by
 * generating a hash that automatically contains a salt on it.
 */
userSchema.statics.saveUser = (user) => {
  const hash = bcrypt.hashSync(user.key);
  user.key = hash;
  return user.save();
};

/**
 * User - Mongoose model
 * Creates the instas of the User model to be exported as middleware
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
