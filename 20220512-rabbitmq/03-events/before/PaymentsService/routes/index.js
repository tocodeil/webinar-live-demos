var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/ipn', function(req, res) {
  try {
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;

