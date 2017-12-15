'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Practica 1 Node JS Bootcamp Mobile VI.' });
});

module.exports = router;
