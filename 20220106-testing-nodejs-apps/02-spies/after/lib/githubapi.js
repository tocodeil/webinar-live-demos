const request = require('superagent');

exports.getUserData = async function(username) {
  const response = await request
    .get(`https://api.github.com/users/${username}`)
    .set('User-Agent', 'demo');

  return response.body;
}
