const { validatePassword } = require('../app/middlewares/userMiddle');

const shortPass = '1234';
const equalPass = '12345678';
const longPass = '12345678912346579';

test('No validate password shorter than 8 characters', () => {
  const req = {
    body: {
      password: shortPass
    }
  };
  const res = {};
  const promise = new Promise((resolve, reject) => {
    validatePassword(req, res, err => {
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
  expect(promise).rejects.toThrow();
});

test('Validate password equal to 8 characters', () => {
  const req = {
    body: {
      password: equalPass
    }
  };
  const res = {};
  const promise = new Promise((resolve, reject) => {
    validatePassword(req, res, err => {
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
  expect(promise).resolves.not.toThrow();
});

test('Validate password longer than 8 characters', () => {
  const req = {
    body: {
      password: longPass
    }
  };
  const res = {};
  const promise = new Promise((resolve, reject) => {
    validatePassword(req, res, err => {
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
  expect(promise).resolves.not.toThrow();
});
