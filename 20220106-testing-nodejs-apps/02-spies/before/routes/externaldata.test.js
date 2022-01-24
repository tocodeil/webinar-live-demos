const request = require('supertest');
const app = require('../app');
const githubapi = require('../lib/githubapi');

describe('external data', () => {
    it('should return number of followers of ynonp', async () => {
        jest.spyOn(githubapi, 'getNumberOfFollowers').mockResolvedValue(10);
        const resp = await request(app).get('/github/ynonp');
        expect(resp.text).toMatch(/User (\w+) has (\d+) followers/);
    })

    it('calls getNumberOfFollowers with the right user', async () => {
        const spy = jest.spyOn(githubapi, 'getNumberOfFollowers').mockResolvedValue(10);
        const resp = await request(app).get('/github/ynonp');
        expect(spy).toHaveBeenLastCalledWith('ynonp');
    })
});