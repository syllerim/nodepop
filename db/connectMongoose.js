'use strict';

const configs = require('../src/configs');
const mongoose = require('mongoose');

const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', (err) => {
  console.log('err', err);
  process.exit(1);
}).once('open', () => {
  if (configs.setup.executeSeeds) {
    require('./seeds/cleandb');
  }
});

mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true });

module.exports = conn;
