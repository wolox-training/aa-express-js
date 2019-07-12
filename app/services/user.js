const bcrypt = require('bcryptjs');

const User = require('../models').users;
const errors = require('../errors');
const userConfig = require('../../config').common.user;
const saltRounds = 10;

exports.checkUserProperties = query => query.firstName && query.lastName && query.email && query.password;
exports.createUser = query => {
  if (!exports.checkUserProperties(query)) {
    throw errors.badRequest('User atributte missing');
  }
  if (!exports.validatePassword(query.password)) {
    throw errors.badRequest('Password is not valid');
  }
  if (!exports.validateEmail(query.email)) {
    throw errors.badRequest('Email is not valid');
  }
  try {
    return bcrypt.hash(query.password, saltRounds).then(async hash => {
      const result = await User.create({
        firstName: query.firstName,
        lastName: query.lastName,
        email: query.email,
        password: hash
      });
      return result;
    });
  } catch (e) {
    throw errors.databaseError(e.message);
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
