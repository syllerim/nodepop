'use strict';

const express = require('express');

const router = express.Router();
const Item = require('./../../models/item');

router.get('/', async (req, res, next) => {
  try {
    const name = req.query.nombre;
    const tag = req.query.tag;
    const forSell = req.query.venta;
    const price = req.query.precio;
    const start = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const includeTotal = req.query.includeTotal;
    const fields = req.query.fields;

    // Create empty filter
    const filter = {};

    // Add the filter parameters
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (tag) {
      filter.tags = { $all: [tag] };
    }

    if (forSell) {
      filter.forSell = forSell;
    }

    if (price) {
      const hyphenPosition = price.indexOf('-');
      if (hyphenPosition === -1) {
        filter.price = price;
      } else if (hyphenPosition === 0) {
        const maxPrice = price.substring(1, price.length - 1);
        filter.price = { $lt: maxPrice };
      } else if (hyphenPosition === price.length - 1) {
        const minPrice = price.substring(0, price.length - 2);
        filter.price = { $gt: minPrice };
      } else {
        const minPrice = price.substring(0, hyphenPosition);
        const maxPrice = price.substring(hyphenPosition + 1, price.length);
        filter.price = { $gt: minPrice, $lt: maxPrice };
      }
    }

    const rows = await Item.list(filter, start, limit, sort, fields);
    let totalItems = 0;

    if (includeTotal) {
      totalItems = await Item.totalItems(filter);
      res.json({ items: rows, totalItems });
    } else {
      res.json({ items: rows });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
