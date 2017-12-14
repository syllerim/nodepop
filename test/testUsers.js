const chai = require('chai');

const User = require('./../src/models/user');

/**
 * Testing model validations
 */
describe('User name', () => {
  it('Field is required.', (done) => {
    const user = new User();
    user.validate((error) => {
      chai.expect(error.errors.name).to.exist;
      done();
    });
  });
});

describe('User email', () => {
  it('Field is required.', (done) => {
    const user = new User();
    user.validate((error) => {
      chai.expect(error.errors.name).to.exist;
      done();
    });
  });
});

describe('User email', () => {
  it('Invalid format for email.', (done) => {
    const user = new User();
    user.validate((error) => {
      chai.expect(error.errors.name).to.exist;
      done();
    });
  });
});

describe('User key', () => {
  it('Field is required.', (done) => {
    const user = new User();
    user.validate((error) => {
      chai.expect(error.errors.key).to.exist;
      done();
    });
  });
});

describe('User', () => {
  it('User created successfuly.', (done) => {
    const user = new User({ name: 'petter', email: 'email@gmail.com', key: '1234' });
    user.validate((error) => {
      chai.expect(error).to.be.null;
      done();
    });
  });
});

