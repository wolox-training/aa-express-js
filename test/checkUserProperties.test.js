const { checkUserProperties } = require('../app/middlewares/userMiddle');

const rightBody = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const notFirstNameBody = {
  lastName: 'Acevedo',
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const notLastNameBody = {
  firstName: 'Alejo',
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const notEmailBody = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  password: '123456789'
};

const notPasswordBody = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  email: 'alejo.acevedo@wolox.com.ar'
};

test('Right Body Check', async () => {
  const req = {
    body: rightBody
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

test('Not First Name Body Check', async () => {
  const req = {
    body: notFirstNameBody
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

test('Not Last Name Body Check', () => {
  const req = {
    body: notLastNameBody
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

test('Not Email Body Check', () => {
  const req = {
    body: notEmailBody
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

test('Not Password Body Check', () => {
  const req = {
    body: notPasswordBody
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
