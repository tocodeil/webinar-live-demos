const express = require('express')
const app = express()
const port = 3000

let
  redis     = require('redis'),
  /* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
  client    = redis.createClient({
    port      : 6379,
    host      : 'redis',        // replace with your hostanme or IP address
  });

app.get('/', (req, res) => {
  client.get(req.hostname, (err, count) => {
    if (err) return next(err);
    res.send({ count });
  });
});

app.post('/', (req, res, next) => {
  client.incr(req.hostname, (err, count) => {
    if (err) return next(err);

    res.send({ count });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
