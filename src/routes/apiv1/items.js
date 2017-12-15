'use strict';

const express = require('express');

const router = express.Router();
const Item = require('./../../models/item');

/* GET /anuncios page.
 * GET /agentes
 * Devuelve agentes
*/
router.get('/', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      res.json({ err });
    }
    res.json({ items });
  });
});

module.exports = router;
