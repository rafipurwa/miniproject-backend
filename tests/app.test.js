const request = require('supertest');
const app = require('../src/app');

describe('GET /users', () => {
  test('it should respond with an array of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
