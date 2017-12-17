'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
  const token = req.body.token || req.query.token || req.get('x-access-token');

  if (!token) {
    const error = new Error('NO_TOKEN_PROVIDED');
    error.message = req.__('ERR_NO_TOKEN_PROVIDED');
    next(error);
    return;
  }

  // Check credenciales
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const error = new Error('TOKEN_ERROR');
      error.errors = err;
      next(error);
      return;
    }

    // Decoded value stored on the request for the next middlewares
    req.userId = decoded.user_id;
    next();
  });
};
