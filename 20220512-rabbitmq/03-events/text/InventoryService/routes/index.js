var express = require('express');
var router = express.Router();
const { getActiveOrders, getRemainingBooksCount } = require('../lib/inventory');

/* GET home page. */
router.get('/active-orders', function(req, res, next) {
  res.send(getActiveOrders());
});

router.get('/status', function(req, res, next) {
  res.send(`${getRemainingBooksCount()} Books remaining`);
});

module.exports = router;
