var express = require('express');
var router = express.Router();
var { getUsers } = require('../lib/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(getUsers());
});

module.exports = router;
