const request = require('supertest');
const app = require('../app');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
describe('#/', () => {
  it('returns an HTML when accept is html', async () => {
    const response = await request(app)
        .get('/')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200);
    const dom = new JSDOM(response.text);
    expect(dom.window.document.querySelector('title').textContent).toEqual('Express');
  });
});
