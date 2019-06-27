/* eslint-disable no-unused-vars */
const { createUser } = require('../app/services/userService');

const firstRightQuery = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const secondRightQuery = {
  firstName: 'Juan',
  lastName: 'Perez',
  email: 'juan.perez@wolox.com.ar',
  password: '123456789'
};

const notWoloxEmailQuery = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  email: 'alejo.acevedo@live.com.ar',
  password: '123456789'
};

const notEmailFormatQuery = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  email: '@wolox.com.ar.Alejo',
  password: '123456789'
};

test('Right Only One Creation User', async () => {
  await expect(createUser(firstRightQuery)).resolves.not.toThrow();
});

test('Try To Create Two User With Equal Email', async () => {
  await expect(createUser(firstRightQuery)).resolves.not.toThrow();
  await expect(createUser(firstRightQuery)).rejects.toThrow();
});

test('Try To Create Two User With Different Email', async () => {
  await expect(createUser(firstRightQuery)).resolves.not.toThrow();
  await expect(createUser(secondRightQuery)).resolves.not.toThrow();
});

test('Try To Create One User With Not Wolox Email', async () => {
  await expect(createUser(notWoloxEmailQuery)).rejects.toThrow();
});

test('Try To Create One User With Not Format Email', async () => {
  await expect(createUser(notEmailFormatQuery)).rejects.toThrow();
});
