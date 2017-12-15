const mongoose = require('mongoose');
const Item = require('./../../src/models/item');
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

  it('Item - Insert', (done) => {
    const item = new Item({
      name: 'iPad',
      forSell: false,
      price: 90.15,
      imagePath: 'images/anuncios/ipad.jpg',
      tags: ['lifestyle', 'mobile']
    });
    item.save(done);
  });
});

describe('Test  Retrieve data with Mongoose', () => {
  it('Item Retrieve', (done) => { // query.where('tags').in(new Array(filters.tags));
    Item.find({ tags: { $all: ['mobile'] } }, (err, name) => {
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

