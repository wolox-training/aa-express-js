const request = require('supertest');
const chance = require('chance')();
const bcrypt = require('bcryptjs');

const app = require('../app');
const db = require('../app/models');

const saltRounds = 10;

const firstRightQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

const secondRightQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

const adminUser = {
  firstName: 'admin',
  lastName: 'admin',
  email: 'admin@wolox.com.ar',
  password: 'adminadmin'
};

describe('Get Albums Of User', () => {
  beforeEach(async done => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(201);
    await request(app)
      .post('/users')
      .send(secondRightQuery)
      .expect(201);
    bcrypt.hash(adminUser.password, saltRounds).then(hash =>
      db.users
        .create({
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          email: adminUser.email,
          password: hash,
          admin: true
        })
        .then(done())
    );
  });
  test('Correct Get Albums Of Users', async () => {
    const firstRes = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    const secondRes = await request(app)
      .post('/users/sessions')
      .send(secondRightQuery)
      .expect(200);
    const adminRes = await request(app)
      .post('/users/sessions')
      .send(adminUser)
      .expect(200);
    await request(app)
      .post('/albums/1')
      .set('token', firstRes.body.token)
      .send()
      .expect(200);
    await request(app)
      .post('/albums/2')
      .set('token', secondRes.body.token)
      .send()
      .expect(200);
    request(app)
      .get('/users/1/albums')
      .set('token', firstRes.body.token)
      .send()
      .expect(200);
    request(app)
      .get('/users/2/albums')
      .set('token', secondRes.body.token)
      .send()
      .expect(200);
    request(app)
      .get('/users/1/albums')
      .set('token', adminRes.body.token)
      .send()
      .expect(200);
    request(app)
      .get('/users/2/albums')
      .set('token', adminRes.body.token)
      .send()
      .expect(200);
  });
  test('Try Get Albums Of Users From Other User Not Admin', async () => {
    const firstRes = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    const secondRes = await request(app)
      .post('/users/sessions')
      .send(secondRightQuery)
      .expect(200);
    await request(app)
      .post('/albums/1')
      .set('token', firstRes.body.token)
      .send()
      .expect(200);
    await request(app)
      .post('/albums/2')
      .set('token', secondRes.body.token)
      .send()
      .expect(200);
    request(app)
      .get('/users/2/albums')
      .set('token', firstRes.body.token)
      .send()
      .expect(403);
    request(app)
      .get('/users/1/albums')
      .set('token', secondRes.body.token)
      .send()
      .expect(403);
  });
});
