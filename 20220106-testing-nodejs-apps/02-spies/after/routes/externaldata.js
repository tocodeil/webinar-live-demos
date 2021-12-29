var express = require('express');
var router = express.Router();
var githubapi = require('../lib/githubapi');

/* GET home page. */
router.get('/:username', async function(req, res, next) {
  const { username } = req.params;
  const data = await githubapi.getUserData(username);
  res.send(`User ${username} has ${data.followers} followers`);
});

module.exports = router;


