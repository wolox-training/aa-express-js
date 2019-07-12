const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errors = require('../errors');
const db = require('../models');
const secretKey = require('../../config').common.jwt.secret_key;
const saltRounds = 10;

exports.createAdminUser = async body => {
  try {
    let result = await db.users.find({ where: { email: body.email } });
    if (!result) {
      result = await this.createUser(body);
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
        const result = await db.users.create({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: hash,
          admin: false
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
    const result = await db.users.find({
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
    const result = await db.users.findAll({ offset, limit });
    return result;
  } catch (e) {
    e.internalCode = 'database_error';
    throw e;
  }
};
exports.getAlbumsOfUser = async (userEmail, userId, admin, getAlbum) => {
  const albumsProm = [];
  try {
    const user = await db.users.find({ where: { id: userId } });
    if (!user) {
      throw errors.badRequest('User not exist');
    }
    if (user.email !== userEmail && !admin) {
      throw errors.forbiddenUser('You can not see albums from other users');
    }
    const transactions = await db.albums_transactions.findAll({ where: { userId } });
    transactions.forEach(transaction => {
      const albumProm = getAlbum(transaction.albumId);
      albumsProm.push(albumProm);
    });
    return Promise.all(albumsProm);
  } catch (e) {
    if (e.internalCode) {
      throw e;
    }
    throw errors.defaultError(e.message);
  }
};
