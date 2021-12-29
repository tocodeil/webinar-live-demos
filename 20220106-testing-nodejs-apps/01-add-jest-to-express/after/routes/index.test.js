const request = require('supertest');
const { JSDOM } = require("jsdom");
const app = require('../app');

it('returns 200 for route /', (done) => {
  request(app)
    .get('/')
    .set('Accept', 'text/html')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function(err, _res) {
      if (err) throw err;
      done();
    });
});

it('main route has "express" for title', (done) => {
  request(app)
    .get('/')
    .set('Accept', 'text/html')
    .expect(200)
    .expect('Content-Type', /html/)
    .then(function(res) {
      const { document } = (new JSDOM(res.text)).window;
      expect(document.title).toEqual('Express');
      done();
    }).catch(err => done(err));
});

it('returns a JSON when Accept header is set to JSON', (done) => {
  request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(function(res) {
      expect(res.body.title).toEqual('Express');
      done();
    }).catch(err => done(err));
});

