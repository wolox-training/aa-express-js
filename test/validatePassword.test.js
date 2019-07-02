const { validatePassword } = require('../app/services/user');

const shortPass = '1234';
const equalPass = '12345678';
const longPass = '12345678912346579';

test('No validate password shorter than 8 characters', () => {
  expect(validatePassword(shortPass)).toBeFalsy();
});

test('Validate password equal to 8 characters', () => {
  expect(validatePassword(equalPass)).toBeTruthy();
});

test('Validate password longer than 8 characters', () => {
  expect(validatePassword(longPass)).toBeTruthy();
});
