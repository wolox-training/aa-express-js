const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = require('../models').users;
const AlbumTransaction = require('../models').albumsTransactions;
const errors = require('../errors');
const secretKey = require('../../config').common.jwt.secret_key;
const expirationTime = require('../../config').common.jwt.expiration_time;
const saltRounds = 10;

exports.createAdminUser = async body => {
  try {
    let user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      user = await exports.createUser(body);
    }
    return user.update({ admin: true });
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
    return bcrypt.compare(body.password, user.password).then(async res => {
      if (!res) {
        throw errors.badRequest('Wrong password');
      }
      await user.update({ timestampTokenCreation: moment().format() });
      return jwt.sign({ email: user.email, admin: user.admin }, secretKey, { expiresIn: expirationTime });
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
exports.getAlbumsOfUser = async (userEmail, userId, admin, getAlbum) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw errors.notFound('User not exist');
    }
    if (user.email !== userEmail && !admin) {
      throw errors.forbiddenUser('You can not see albums from other users');
    }
    const transactions = await AlbumTransaction.findAll({ where: { userId } });
    return Promise.map(transactions, transcation => getAlbum(transcation));
  } catch (e) {
    if (e.internalCode) {
      throw e;
    }
    throw errors.defaultError(e.message);
  }
};
exports.getPhotosOfAlbums = async (userEmail, albumId, getPhotosOfAlbum) => {
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      throw errors.badRequest('User not exist');
    }
    const transaction = await AlbumTransaction.findOne({ where: { userId: user.id, albumId } });
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

exports.invalidateTokensOfUser = email =>
  User.update({ timestampTokenCreation: moment().format() }, { where: { email } });
