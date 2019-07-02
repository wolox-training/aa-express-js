const { checkUserProperties } = require('../app/services/user');

const rightQuery = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const notFirstNameQuery = {
  lastName: 'Acevedo',
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const notLastNameQuery = {
  firstName: 'Alejo',
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const notEmailQuery = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  password: '123456789'
};

const notPasswordQuery = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  email: 'alejo.acevedo@wolox.com.ar'
};

test('Right Query Check', () => {
  expect(checkUserProperties(rightQuery)).toBeTruthy();
});

test('Not First Name Query Check', () => {
  expect(checkUserProperties(notFirstNameQuery)).toBeFalsy();
});

test('Not Last Name Query Check', () => {
  expect(checkUserProperties(notLastNameQuery)).toBeFalsy();
});

test('Not Email Query Check', () => {
  expect(checkUserProperties(notEmailQuery)).toBeFalsy();
});

test('Not Password Query Check', () => {
  expect(checkUserProperties(notPasswordQuery)).toBeFalsy();
});
