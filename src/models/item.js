'use strict';

const mongoose = require('mongoose');

const tagsEnum = {
  values: ['work', 'lifestyle', 'motor', 'mobile'],
  message: '{PATH} is not a valid enum value for path {VALUE}.'
};

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  forSell: {
    type: Boolean,
    unique: false,
    required: true
  },
  price: {
    type: Number,
    unique: false,
    min: 0
  },
  imagePath: {
    type: String,
    unique: false,
    trim: true
  },
  tags: {
    type: [
      {
        type: String,
        enum: tagsEnum,
        required: true,
        index: true
      }
    ],
    unique: false,
    required: true,
    validate: (items) => {
      items.length > 0;
    }
  }
});

itemSchema.index({
  tag: 1, forSell: 1, name: 1, price: 1
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
