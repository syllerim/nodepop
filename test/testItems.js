const chai = require('chai');

const Item = require('./../src/models/item');

/**
 * Testing model validations
 */
describe('Item name', () => {
  it('Field is required.', (done) => {
    const item = new Item();
    item.validate((error) => {
      chai.expect(error.errors.name).to.exist;
      done();
    });
  });
});


describe('Item forSell', () => {
  it('Field is required.', (done) => {
    const item = new Item();
    item.validate((error) => {
      chai.expect(error.errors.forSell).to.exist;
      done();
    });
  });
});

describe('Item price', () => {
  it('Field min value is 0.', (done) => {
    const item = new Item({ price: -1 });
    item.validate((error) => {
      chai.expect(error.errors.price).to.exist;
      done();
    });
  });
});

describe('Item tags', () => {
  it('Field is required.', (done) => {
    const item = new Item();
    item.validate((error) => {
      chai.expect(error.errors.tags).to.exist;
      done();
    });
  });
});

describe('Item tags', () => {
  it('At least one tag should be added.', (done) => {
    const item = new Item({ tags: [] });
    item.validate((error) => {
      chai.expect(error.errors.tags).to.exist;
      done();
    });
  });
});

describe('Item tags', () => {
  it('Invalid tag inserted.', (done) => {
    const item = new Item({ tags: ['invalidValue'] });
    item.validate((error) => {
      chai.expect(error.errors['tags.0']).to.exist;
      done();
    });
  });
});

describe('Item', () => {
  it('Item created successfuly.', (done) => {
    const item = new Item({
      name: 'iPad',
      forSell: true,
      price: 100.0,
      tags: ['mobile']
    });
    item.validate((error) => {
      chai.expect(error).to.be.null;
      done();
    });
  });
});
