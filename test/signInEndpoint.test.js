const request = require('supertest');
const chance = require('chance')();

const app = require('../app');

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

const logInWrongEmailQuery = {
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: firstRightQuery.password
};

const logInWrongPassQuery = {
  email: firstRightQuery.email,
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

describe('Test sign in endpoint', () => {
  test('Correct Log In', async () => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(201);
    await request(app)
      .post('/users/sessions')
      .send(logInRightQuery)
      .expect(200);
  });

  test('Wrong Email Log In', async () => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(201);
    const res = await request(app)
      .post('/users/sessions')
      .send(logInWrongEmailQuery)
      .expect(404);
    expect(res.body.message).toBe('User not found');
  });

  test('Wrong Password Log In', async () => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(201);
    const res = await request(app)
      .post('/users/sessions')
      .send(logInWrongPassQuery)
      .expect(400);
    expect(res.body.message).toBe('Wrong password');
  });
});
