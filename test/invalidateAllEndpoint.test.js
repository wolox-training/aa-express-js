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

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

describe('Invalidate All Tokens', () => {
  beforeEach(async done => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(201);
    done();
  });
  test('Invalidate Tokens', async () => {
    let res = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await sleep(1000);
    await request(app)
      .post('/albums/1')
      .set('token', res.body.token)
      .send()
      .expect(200);
    await request(app)
      .post('/users/sessions/invalidate_all')
      .set('token', res.body.token)
      .send()
      .expect(200);
    await request(app)
      .post('/albums/2')
      .set('token', res.body.token)
      .send()
      .expect(403);
    res = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/albums/2')
      .set('token', res.body.token)
      .send()
      .expect(200);
  });
});
