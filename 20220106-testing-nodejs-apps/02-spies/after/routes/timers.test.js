const request = require('supertest');
const app = require('../app');

describe('Timers', () => {
  it('should show 1 day left on the last day of a month', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-12-31'));
    const res = await request(app).get('/timers').expect(200);
    expect(res.text).toEqual('1 left in current month');
  });
});

