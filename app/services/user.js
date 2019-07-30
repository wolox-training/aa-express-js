const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models').users;
const errors = require('../errors');
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
        const user = await User.create({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: hash,
          admin: false
        });
        return user;
      } catch (e) {
        if (e.message === 'Validation error') {
          throw errors.badRequest('Email alredy exist');
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
  try {
    const user = await User.findOne({
      where: {
        email: body.email
      }
    });
    if (!user) {
      throw errors.notFound('User not found');
    }
    return await bcrypt.compare(body.password, user.password).then(res => {
      if (!res) {
        throw errors.badRequest('Wrong password');
      }
      return jwt.sign({ email: user.email, admin: user.admin }, secretKey);
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
    throw errors.databaseError(e.message);
  }
};
