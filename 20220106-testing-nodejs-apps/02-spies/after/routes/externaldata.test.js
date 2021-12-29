const request = require('supertest');
const githubapi = require('../lib/githubapi');
const app = require('../app');

describe('External DAta', () => {
  it('', async () => {
    jest.spyOn(githubapi, 'getUserData').mockResolvedValue({ followers: 10 });
    const res = await request(app).get('/github/ynonp').expect(200);
    expect(res.text).toEqual('User ynonp has 10 followers');
  });
});


