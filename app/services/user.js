const bcrypt = require('bcryptjs');

const db = require('../models');
const userConfig = require('../../config').common.user;
const saltRounds = 10;

exports.checkUserProperties = query => {
  if (query.firstName && query.lastName && query.email && query.password) {
    return true;
  }
  return false;
};
exports.createUser = query => {
  if (!this.checkUserProperties(query)) {
    const err = new Error('User atributte missing');
    err.internalCode = 'bad_request';
    throw err;
  }
  if (!this.validatePassword(query.password)) {
    const err = new Error('Password is not valid');
    err.internalCode = 'bad_request';
    throw err;
  }
  if (!this.validateEmail(query.email)) {
    const err = new Error('Email is not valid');
    err.internalCode = 'bad_request';
    throw err;
  }
  try {
    return bcrypt.hash(query.password, saltRounds).then(async hash => {
      try {
        const result = await db.users.create({
          firstName: query.firstName,
          lastName: query.lastName,
          email: query.email,
          password: hash
        });
        return result;
      } catch (e) {
        if (e.message === 'Validation error') {
          e.internalCode = 'bad_request';
          throw e;
        }
        e.internalCode = 'database_error';
        throw e;
      }
    });
  } catch (e) {
    e.internalCode = 'database_error';
    throw e;
  }
};
exports.validatePassword = password => {
  if (RegExp(userConfig.password_regex).test(password)) {
    return true;
  }
  return false;
};
exports.validateEmail = email => {
  if (RegExp(userConfig.email_regex).test(email)) {
    return true;
  }
  return false;
};
