var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.accepts('html')) {
    return res.render('index', { title: 'Express' });
  } else if (req.accepts('json')) {
    return res.send({ title: 'Express' });
  }

  res.sendStatus(406);
});

module.exports = router;
