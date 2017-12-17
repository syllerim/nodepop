'use strict';

const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('./../../models/user');
const jwt = require('jsonwebtoken');

/**
 * POST /user
 * @param name: Name of the user to register
 * @param email: email of the user to register
 * @param password: password of the user to register
 * Endpoint that receive a name, email, and password.
 * The parameters are received on the body and they are validated
 * using express-validator.
 *
*/
router.post('/', [
  check('name.*.email.*.password').exists(),
  check('email')
    .isEmail().withMessage('ERR_EXPRESS_VALIDATOR_EMAIL_FORMAT_INCORRECT')
    .trim()
    .normalizeEmail(),
  check('password', 'ERR_EXPRESS_VALIDATOR_PASSWORD_FORMAT_INCORRECT')
    .isLength({ min: 6 })
    .matches(/\d/),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        key: req.body.password
      });
      await User.saveUser(user);
      res.json({ user });
    } else {
      const errorValidation = new Error('VALIDATION_ERROR_FIELDS');
      errorValidation.errors = errors.mapped();
      errorValidation.msg = errors.array()[0].msg;
      throw errorValidation;
    }
  } catch (err) {
    next(err);
  }
});


/**
 * POST /user/authorize
 * @param email
 * @param password
 * The router method check if the user is valid
 * In positive case, it returns the token for
 * forseable calls to backend.
 *  */

router.post('/authenticate', [
  check('.email.*.password').exists().withMessage('ERR_EXPRESS_VALIDATOR_INSERT_NAME'),
  check('email')
    .isEmail().withMessage('ERR_EXPRESS_VALIDATOR_EMAIL_FORMAT_INCORRECT')
    .trim()
    .normalizeEmail(),
  check('password', 'ERR_EXPRESS_VALIDATOR_PASSWORD_FORMAT_INCORRECT')
    .isLength({ min: 6 })
    .matches(/\d/),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const user = await User.searchUser(req.body.email);
      const userValid = await User.userValid(req.body.password, user.key, req);
      if (userValid) {
        jwt.sign(
          { user_id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({ success: true, token });
          }
        );
      } else {
        const error = new Error('INVALID_CREDENTIALS');
        errorValidation.errors = errors.mapped();
        errorValidation.msg = errors.array()[0].msg;
        throw error;
      }
    }
    const errorValidation = new Error('VALIDATION_ERROR_FIELDS');
    errorValidation.errors = errors.mapped();
    errorValidation.msg = errors.array()[0].msg;
    throw errorValidation;
  } catch (err) {
    next(err);
  }
});

module.exports = router;
