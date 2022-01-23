import * as request from 'supertest';
import app from '../main';

describe('POST /api/identity ~ access token', () => {
  beforeAll((done) => {
    // Asynchronous task
    // ...
    done();
  });

  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaWQiOiJkaWQ6a2V5Ono2TWtyVVc0aFhFSDkxZ1djUEQ5VWV1cTV1ZDZYdkZzaXpFMmY1WG0zRVNKMVlkcCIsInRpbWUiOiJTdW4gSmFuIDIzIDIwMjIgMTc6MzQ6MTIgR01UKzAxMDAgKENlbnRyYWwgRXVyb3BlYW4gU3RhbmRhcmQgVGltZSkiLCJpYXQiOjE2NDI5NTU2NTIsImV4cCI6MTY0Mjk2NjQ1Mn0.l2E_qWhpdfLLUpXUPT4G7fnUDccAqqBIG-YnGSyB4qw';

  it.only('Returns 200', async () => {
    const response = await request(app).post('/api/identity').send({
      accessToken: accessToken,
    });
    expect(response.status).toBe(200);
  });
});
