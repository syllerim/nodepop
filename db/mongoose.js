'use strict';

const mongoose = require('mongoose');

const { connection } = mongoose.connection;

const { db } = require('../src/configs');

mongoose.Promise = global.Promise;

connection.on('error', (err) => {
  console.log('err', err);
  process.exit(1);
});

connection.once('open', () => {
  console.log(`Connectado a mongodb en ${mongoose.connection.name}`);
});

const uri = `${db.dialect}://${db.username}:${db.password}@${db.host}:${db.port}/{db.database}`;
mongoose.connect(uri, db.options);

mongoose.connect(uri, db.options);

module.exports = connection;
