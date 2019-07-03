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

const logInRightQuery = {
  email: firstRightQuery.email,
  password: firstRightQuery.password
};

const secondRightQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

const thirdRightQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

const fourRightQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

test('Correct Get Users', async () => {
  await request(app)
    .post('/users')
    .send(firstRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(secondRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(thirdRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(fourRightQuery)
    .expect(200);
  const res = await request(app)
    .post('/users/sessions')
    .send(logInRightQuery)
    .expect(200);
  let users = await request(app)
    .get('/users')
    .set('token', res.body.token)
    .query({ page: '0', size: '1' })
    .expect(200);
  expect(users.body.length).toBe(1);
  expect(users.body[0].email).toBe(firstRightQuery.email);
  users = await request(app)
    .get('/users')
    .set('token', res.body.token)
    .query({ page: '1', size: '1' })
    .expect(200);
  expect(users.body.length).toBe(1);
  expect(users.body[0].email).toBe(secondRightQuery.email);
  users = await request(app)
    .get('/users')
    .set('token', res.body.token)
    .query({ page: '2', size: '1' })
    .expect(200);
  expect(users.body.length).toBe(1);
  expect(users.body[0].email).toBe(thirdRightQuery.email);
  users = await request(app)
    .get('/users')
    .set('token', res.body.token)
    .query({ page: '3', size: '1' })
    .expect(200);
  expect(users.body.length).toBe(1);
  expect(users.body[0].email).toBe(fourRightQuery.email);
  users = await request(app)
    .get('/users')
    .set('token', res.body.token)
    .query({ page: '0', size: '3' })
    .expect(200);
  expect(users.body.length).toBe(3);
  expect(users.body[1].email).toBe(secondRightQuery.email);
});
test('Not Valid Token Get Users', async () => {
  await request(app)
    .post('/users')
    .send(firstRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(secondRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(thirdRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(fourRightQuery)
    .expect(200);
  await request(app)
    .post('/users/sessions')
    .send(logInRightQuery)
    .expect(200);
  await request(app)
    .get('/users')
    .set('token', 'res.body.token')
    .query({ page: '0', size: '1' })
    .expect(403);
});
test('Not Token Get Users', async () => {
  await request(app)
    .post('/users')
    .send(firstRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(secondRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(thirdRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(fourRightQuery)
    .expect(200);
  await request(app)
    .post('/users/sessions')
    .send(logInRightQuery)
    .expect(200);
  await request(app)
    .get('/users')
    .query({ page: '0', size: '1' })
    .expect(403);
});
