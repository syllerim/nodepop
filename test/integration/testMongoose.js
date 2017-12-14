const mongoose = require('mongoose');
const Item = require('./../../src/models/item');
const User = require('./../../src/models/user');
const chalk = require('chalk');


describe('Test Insert in Mongoose Database', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/dbTest', { useMongoClient: true });
    const conn = mongoose.connection;
    conn.on('error', console.error.bind(console, 'connection error'));
    conn.once('open', () => {
      console.log(chalk.green('Connected to database.'));
      done();
    });
  });

  it('Item - Not insert', (done) => {
    const item = new Item({
      name: 'Bicicleta',
      forSell: true,
      price: 10.0,
      imagePath: 'images/anuncios/bici.jpg'
    });

    item.save((err) => {
      if (err) { return done(); }
      throw new Error('Should have generated an error.');
    });
  });


  it('Item - Insert', (done) => {
    const item = new Item({
      name: 'Bicicleta',
      forSell: true,
      price: 230.15,
      imagePath: 'images/anuncios/bici.jpg',
      tags: ['lifestyle', 'motor']
    });
    item.save(done);
  });


  it('User - Not insert', (done) => {
    const user = new User({
      email: 'pedro@gmail.com',
      key: 'Salamander!1'
    });

    user.save((err) => {
      if (err) { return done(); }
      throw new Error('Should have generated an error.');
    });
  });

  it('User - Insert', (done) => {
    const user = new User({
      name: 'Mary',
      email: 'pedro@gmail.com',
      key: 'Salamander!1'
    });
    user.save(done);
  });
});

describe('Test Retrieve from Mongoose Database', () => {
  it('Item - Retrieve data', (done) => {
    Item.find({ name: 'Bicicleta' }, (err, name) => {
      if (err) { throw err; }
      if (name.length === 0) { throw new Error('No data!'); }
      done();
    });
  });

  it('User - Retrieve data', (done) => {
    User.find({ name: 'Mary' }, (err, name) => {
      if (err) { throw err; }
      if (name.length === 0) { throw new Error('No data!'); }
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
