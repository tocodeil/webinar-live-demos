var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const firstDayOfNextMonth = new Date();
  firstDayOfNextMonth.setDate(0);
  firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1);

  const diffInDays = Math.ceil((firstDayOfNextMonth - new Date()) / (1000 * 3600 * 24)) + 2;
  res.send(`${diffInDays} left in current month`);
});

module.exports = router;

