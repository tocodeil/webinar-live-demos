// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var { expressjwt: jwt } = require("express-jwt");
var jwks = require('jwks-rsa');
console.log(jwt);

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://webinar-demo.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://tocode-webinars/todos',
    issuer: 'https://webinar-demo.us.auth0.com/',
    algorithms: ['RS256']
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


export default async function handler(req, res) {
  await runMiddleware(req, res, jwtCheck);
  res.status(200).json({ name: 'John Doe' })
}
