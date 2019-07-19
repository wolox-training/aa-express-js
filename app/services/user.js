const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const errors = require('../errors');
const User = require('../models').users;
const AlbumTransaction = require('../models').albums_transactions;
const secretKey = require('../../config').common.jwt.secret_key;
const expirationTime = require('../../config').common.jwt.expiration_time;
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
    const result = await User.findOne({
      where: {
        email: body.email
      }
    });
    if (!result) {
      throw errors.badRequest('User not found');
    }
    return bcrypt.compare(body.password, result.password).then(async res => {
      if (!res) {
        throw errors.badRequest('Wrong password');
      }
      await result.update({ timestampTokenCreation: moment().format() });
      return jwt.sign({ email: result.email, admin: result.admin }, secretKey, { expiresIn: expirationTime });
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
    return await User.findAll({ offset, limit });
  } catch (e) {
    e.internalCode = 'database_error';
    throw e;
  }
};
exports.getAlbumsOfUser = async (userEmail, userId, admin, getAlbum) => {
  const albumsProm = [];
  try {
    const user = await User.find({ where: { id: userId } });
    if (!user) {
      throw errors.badRequest('User not exist');
    }
    if (user.email !== userEmail && !admin) {
      throw errors.forbiddenUser('You can not see albums from other users');
    }
    const transactions = await AlbumTransaction.findAll({ where: { userId } });
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
exports.getPhotosOfAlbums = async (userEmail, albumId, getPhotosOfAlbum) => {
  try {
    const user = await User.find({ where: { email: userEmail } });
    if (!user) {
      throw errors.badRequest('User not exist');
    }
    const transaction = await AlbumTransaction.find({ where: { userId: user.id, albumId } });
    if (!transaction) {
      throw errors.badRequest('You did not buy this album');
    }
    return getPhotosOfAlbum(albumId);
  } catch (e) {
    if (e.internalCode) {
      throw e;
    }
    throw errors.defaultError(e.message);
  }
};

exports.invalidateAllTokens = async () => {
  try {
    return await User.update({ timestampTokenCreation: moment().format() }, { where: {} });
  } catch (e) {
    throw errors.databaseError(e.message);
  }
};
