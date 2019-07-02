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
  try {
    return bcrypt.hash(query.password, saltRounds).then(async hash => {
      const result = await db.users.create({
        firstName: query.firstName,
        lastName: query.lastName,
        email: query.email,
        password: hash
      });
      return result;
    });
  } catch (e) {
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
