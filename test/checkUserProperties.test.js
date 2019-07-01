/* eslint-disable require-await */
const { checkUserProperties } = require('../app/middlewares/userMiddle');

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

test('Right Query Check', async () => {
  const req = {
    query: rightQuery
  };
  const res = {};
  const promise = new Promise((resolve, reject) => {
    checkUserProperties(req, res, err => {
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
  expect(promise).resolves.not.toThrow();
});

test('Not First Name Query Check', async () => {
  const req = {
    query: notFirstNameQuery
  };
  const res = {};
  const promise = new Promise((resolve, reject) => {
    checkUserProperties(req, res, err => {
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
  expect(promise).rejects.toThrow();
});

test('Not Last Name Query Check', () => {
  const req = {
    query: notLastNameQuery
  };
  const res = {};
  const promise = new Promise((resolve, reject) => {
    checkUserProperties(req, res, err => {
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
  expect(promise).rejects.toThrow();
});

test('Not Email Query Check', () => {
  const req = {
    query: notEmailQuery
  };
  const res = {};
  const promise = new Promise((resolve, reject) => {
    checkUserProperties(req, res, err => {
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
  expect(promise).rejects.toThrow();
});

test('Not Password Query Check', () => {
  const req = {
    query: notPasswordQuery
  };
  const res = {};
  const promise = new Promise((resolve, reject) => {
    checkUserProperties(req, res, err => {
      if (!err) {
        resolve();
      }
      reject(err);
    });
  });
  expect(promise).rejects.toThrow();
});
