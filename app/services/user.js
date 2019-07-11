const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errors = require('../errors');
const db = require('../models');
const secretKey = require('../../config').common.jwt.secret_key;
const saltRounds = 10;

exports.createUser = query => {
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
          throw errors.badRequest(e.message);
        }
        throw errors.databaseError(e.message);
      }
    });
  } catch (e) {
    throw errors.defaultError(e.message);
  }
};
exports.loginUser = async body => {
  if (!body.email || !body.password) {
    throw errors.badRequest('Missing attribute');
  }
  try {
    const result = await db.users.findAll({
      where: {
        email: body.email
      }
    });
    if (result.length === 0) {
      throw errors.badRequest('User not found');
    }
    return bcrypt.compare(body.password, result[0].password).then(res => {
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
  if (!page || !size) {
    const err = new Error('Number of page or size missing');
    err.internalCode = 'bad_request';
    throw err;
  }
  if (isNaN(page) || isNaN(size)) {
    const err = new Error('Number of page or size is not a number');
    err.internalCode = 'bad_request';
    throw err;
  }
  const offset = page * size;
  const limit = size;
  try {
    const result = await db.users.findAll({ offset, limit });
    return result;
  } catch (e) {
    e.internalCode = 'database_error';
    throw e;
  }
};
