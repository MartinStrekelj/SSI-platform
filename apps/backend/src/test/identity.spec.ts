import * as request from 'supertest';
import app from '../main';

describe('POST /api/identity ~ access token', () => {
  beforeAll((done) => {
    // Asynchronous task
    // ...
    done();
  });

  const accessToken = 'w';

  it.only('Returns 200', async () => {
    const response = await request(app).post('/api/identity').send({
      accessToken: accessToken,
    });
    expect(response.status).toBe(200);
  });
});
