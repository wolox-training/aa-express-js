const jwt = require('jsonwebtoken');

const secretKey = require('../../config').common.jwt.secret_key;
const errors = require('../errors');

exports.checkToken = (req, res, next) => {
  const { token } = req.headers;
  try {
    if (!token) {
      return next(errors.badRequest('Not token provided'));
    }
    const decode = jwt.verify(token, secretKey);
    req.decode = decode;
    return next();
  } catch (e) {
    return next(errors.forbiddenUser(e.message));
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.decode.admin) {
    return next(errors.forbiddenUser('Only admin can use this'));
  }
  return next();
};
