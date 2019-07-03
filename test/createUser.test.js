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

const secondRightQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

const notWoloxEmailQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'gmail.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

const notEmailFormatQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.string(),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

test('Right Only One Creation User', async () => {
  await request(app)
    .post('/users')
    .send(firstRightQuery)
    .expect(200);
});

test('Try To Create Two User With Equal Email', async () => {
  await request(app)
    .post('/users')
    .send(firstRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(firstRightQuery)
    .expect(400);
});

test('Try To Create Two User With Different Email', async () => {
  await request(app)
    .post('/users')
    .send(firstRightQuery)
    .expect(200);
  await request(app)
    .post('/users')
    .send(secondRightQuery)
    .expect(200);
});

test('Try To Create One User With Not Wolox Email', async () => {
  await request(app)
    .post('/users')
    .send(notWoloxEmailQuery)
    .expect(400);
});

test('Try To Create One User With Not Format Email', async () => {
  await request(app)
    .post('/users')
    .send(notEmailFormatQuery)
    .expect(400);
});
