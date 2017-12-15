'use strict';

const express = require('express');

const router = express.Router();
const Item = require('./../../models/item');

router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name;
    const tag = req.query.tag;
    const forSell = req.query.venta;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const fields = req.query.fields;

    // Create empty filter
    const filter = {};

    // Add the filter parameters
    if (name) {
      filter.name = name;
    }

    if (tag) {
      filter.tags = { $all: [tag] };
    }

    if (forSell) {
      filter.forSell = forSell;
    }

    const rows = await Item.list(filter, limit, skip, sort, fields);
    res.json({ items: rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
