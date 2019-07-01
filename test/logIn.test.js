const userService = require('../app/services/userService');

const firstRightQuery = {
  firstName: 'Alejo',
  lastName: 'Acevedo',
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const logInRightQuery = {
  email: 'alejo.acevedo@wolox.com.ar',
  password: '123456789'
};

const logInWrongEmailQuery = {
  email: 'alejo.aco@wolox.com.ar',
  password: '123456789'
};

const logInWrongPassQuery = {
  email: 'alejo.acevedo@wolox.com.ar',
  password: '1234ñlhljkhkjl'
};

test('Correct Log In', async () => {
  await userService.createUser(firstRightQuery);
  await expect(userService.loginUser(logInRightQuery)).resolves.not.toThrow();
});

test('Wrong Email Log In', async () => {
  await userService.createUser(firstRightQuery);
  expect(userService.loginUser(logInWrongEmailQuery)).rejects.toThrow('User not found');
});

test('Wrong Password Log In', async () => {
  await userService.createUser(firstRightQuery);
  await expect(userService.loginUser(logInWrongPassQuery)).rejects.toThrow();
});
