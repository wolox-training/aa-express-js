const request = require('supertest');
const Chance = require('chance');

const app = require('../app');

const chance = new Chance();

const firstRightQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

describe('By An Album', () => {
  beforeEach(async done => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(200);
    done();
  });
  test('Correct Buy Of An Album', async () => {
    const res = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/albums/1')
      .set('token', res.body.token)
      .send()
      .expect(200);
  });
  test('Try Buy The Same Album Again', async () => {
    const res = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/albums/1')
      .set('token', res.body.token)
      .send()
      .expect(200);
    await request(app)
      .post('/albums/1')
      .set('token', res.body.token)
      .send()
      .expect(400);
  });
  test('Try Buy An Album Without Credential', async () => {
    await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/albums/1')
      .send()
      .expect(400);
  });
});
