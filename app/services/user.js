const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errors = require('../errors');
const User = require('../models').users;
const secretKey = require('../../config').common.jwt.secret_key;
const saltRounds = 10;

exports.createAdminUser = async body => {
  try {
    let result = await User.find({ where: { email: body.email } });
    if (!result) {
      result = await exports.createUser(body);
    }
    return result.update({ admin: true });
  } catch (e) {
    throw errors.databaseError(e.message);
  }
};
exports.createUser = body => {
  try {
    return bcrypt.hash(body.password, saltRounds).then(async hash => {
      try {
        const result = await User.create({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
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
    if (e.internalCode) {
      throw e;
    }
    throw errors.defaultError(e.message);
  }
};
exports.loginUser = async body => {
  if (!body.email || !body.password) {
    throw errors.badRequest('Missing attribute');
  }
  try {
    const result = await User.findAll({
      where: {
        email: body.email
      }
    });
    if (!result) {
      throw errors.badRequest('User not found');
    }
    return bcrypt.compare(body.password, result.password).then(res => {
      if (!res) {
        throw errors.badRequest('Wrong password');
      }
      return jwt.sign({ email: result.email, admin: result.admin }, secretKey);
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
    const result = await User.findAll({ offset, limit });
    return result;
  } catch (e) {
    e.internalCode = 'database_error';
    throw e;
  }
};
