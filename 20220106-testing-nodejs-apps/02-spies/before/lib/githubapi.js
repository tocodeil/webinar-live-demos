const request = require('superagent');

exports.getNumberOfFollowers = async function getNumberOfFollowers(username) {
    const response = await request
        .get(`https://api.github.com/users/${username}`)
        .set('User-Agent', 'demo');
    const data = response.body;
    return data.followers;
}