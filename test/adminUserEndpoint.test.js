const request = require('supertest');
const Chance = require('chance');
const bcrypt = require('bcryptjs');

const app = require('../app');
const db = require('../app/models');
const saltRounds = 10;

const chance = new Chance();

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

describe('Create Admin Users', () => {
  beforeEach(done => {
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
  test('Correct Add Admin User', async () => {
    const res = await request(app)
      .post('/users/sessions')
      .send(adminUser)
      .expect(200);
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/admin/users')
      .set('token', res.body.token)
      .send(firstRightQuery)
      .expect(201);
    await request(app)
      .post('/admin/users')
      .set('token', res.body.token)
      .send(secondRightQuery)
      .expect(201);
  });
  test('Not Admin User Try To Add An Admin User', async () => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(200);
    const res = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/admin/users')
      .set('token', res.body.token)
      .send(secondRightQuery)
      .expect(403);
    await request(app)
      .post('/users')
      .send(secondRightQuery)
      .expect(200);
    await request(app)
      .post('/admin/users')
      .set('token', res.body.token)
      .send(secondRightQuery)
      .expect(403);
  });
});
