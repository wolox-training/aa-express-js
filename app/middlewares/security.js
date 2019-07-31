const jwt = require('jsonwebtoken');

const secretKey = require('../../config').common.jwt.secret_key;
const errors = require('../errors');
const securityService = require('../services/security');

exports.checkToken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    if (!token) {
      return next(errors.badRequest('Not token provided'));
    }
    const decode = jwt.verify(token, secretKey);
    const valid = await securityService.validateToken(decode);
    if (valid) {
      req.decode = decode;
      return next();
    }
    return next(errors.forbiddenUser('Not valid token'));
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
