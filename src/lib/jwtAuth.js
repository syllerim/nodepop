'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
  const token = req.body.token || req.query.token || req.get('x-access-token');

  if (!token) {
    const err = new Error('NoTokenProvided');
    err.errors = { msg: 'Verify you provide a vadid token provided by us.' };
    next(err);
    return;
  }

  // Check credenciales
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const error = new Error('TokenError');
      error.errors = err;
      next(error);
      return;
    }

    // Decoded value stored on the request for the next middlewares
    req.userId = decoded.user_id;
    next();
  });
};
