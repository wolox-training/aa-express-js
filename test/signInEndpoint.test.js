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

const logInWrongEmailQuery = {
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: firstRightQuery.password
};

const logInWrongPassQuery = {
  email: firstRightQuery.email,
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};
describe('Sign In', () => {
  test('Correct Log In', async () => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/users/sessions')
      .send(logInRightQuery)
      .expect(200);
  });

  test('Wrong Email Log In', async () => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/users/sessions')
      .send(logInWrongEmailQuery)
      .expect(400);
  });

  test('Wrong Password Log In', async () => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/users/sessions')
      .send(logInWrongPassQuery)
      .expect(400);
  });
});
