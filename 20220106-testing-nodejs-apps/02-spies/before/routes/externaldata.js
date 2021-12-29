var express = require('express');
var router = express.Router();
const request = require('superagent');

/* GET home page. */
router.get('/:username', async function(req, res, next) {
  const { username } = req.params;
  const response = await request
    .get(`https://api.github.com/users/${username}`)
    .set('User-Agent', 'demo');
  const data = response.body;
  res.send(`User ${username} has ${data.followers} followers`);
});

module.exports = router;


