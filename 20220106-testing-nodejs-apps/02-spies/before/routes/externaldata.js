var express = require('express');
var router = express.Router();
const githubapi = require('../lib/githubapi');

/* GET home page. */
router.get('/:username', async function(req, res, next) {
  const { username } = req.params;
  const followers = await githubapi.getNumberOfFollowers(username);
  res.send(`User ${username} has ${followers} followers`);
});

module.exports = router;


/**
 * 1. My own code
 *
 * 2. How my own code INTERACTS with some external entity
 *
 */