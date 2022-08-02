var express = require('express');
var app = express();
var jwks = require('jwks-rsa');
var { expressjwt: jwt } = require("express-jwt");


var port = process.env.PORT || 8080;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://my-demo-1.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://webinar-demo.tocode.co.il/todos',
    issuer: 'https://my-demo-1.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/todos', function (req, res) {
  const userId = req.auth.sub;
  res.send(`Your list of todo items for user ${userId}`);
});

app.listen(port);






