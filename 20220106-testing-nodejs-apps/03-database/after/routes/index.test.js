const request = require('supertest');
const app = require('../app');
const mockDb = require('../test-helpers/db');

afterEach(() => {
  app.close();
});

describe('#items', () => {
  it('can get items', async () => {
    await app.ready;
    const testItems = [ { text: 'item1' }, { text: 'item2' } ]
    mockDb.resetItems(testItems);
    const res = await request(app).get('/').expect(200);
    const data = res.body;
    for (let i=0; i < testItems; i++) {
      expect(data[i]).toMatchObject(testItems[i]);
    }
  });
});

