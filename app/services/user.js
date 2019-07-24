const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models').users;
const errors = require('../errors');
const secretKey = require('../../config').common.jwt.secret_key;
const saltRounds = 10;

exports.createUser = query => {
  try {
    return bcrypt.hash(query.password, saltRounds).then(async hash => {
      try {
        const result = await User.create({
          firstName: query.firstName,
          lastName: query.lastName,
          email: query.email,
          password: hash
        });
        return result;
      } catch (e) {
        if (e.message === 'Validation error') {
          throw errors.badRequest('Email alredy exist');
        }
        throw errors.databaseError(e.message);
      }
    });
  } catch (e) {
    throw errors.defaultError(e.message);
  }
};
exports.loginUser = async body => {
  try {
    const result = await User.findOne({
      where: {
        email: body.email
      }
    });
    if (!result) {
      throw errors.notFound('User not found');
    }
    return await bcrypt.compare(body.password, result.password).then(res => {
      if (!res) {
        throw errors.badRequest('Wrong password');
      }
      return jwt.sign({ email: body.email }, secretKey);
    });
  } catch (e) {
    if (e.internalCode) {
      throw e;
    }
    throw errors.defaultError(e.message);
  }
};
exports.getUsers = async params => {
  const { page, size } = params;
  const offset = page * size;
  const limit = size;
  try {
    const userList = await User.findAll({ offset, limit });
    return userList;
  } catch (e) {
    e.internalCode = 'database_error';
    throw e;
  }
};
