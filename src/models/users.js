'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
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

const User = mongoose.model('User', userSchema);

module.exports = User;