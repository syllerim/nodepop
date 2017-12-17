'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Practica NodeJS - Bootcamp Mobile VI Edición 🤟🏿' });
});

module.exports = router;
