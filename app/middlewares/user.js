const userConfig = require('../../config').common.user;
const errors = require('../errors');
const log = require('../logger');

exports.checkUserProperties = (req, res, next) => {
  const { body } = req;
  if (body.firstName && body.lastName && body.email && body.password) {
    return next();
  }
  return next(errors.badRequest('User attribute missing'));
};
exports.validatePassword = (req, res, next) => {
  const { password } = req.body;
  log.info(password);
  log.info(userConfig.password_regex);
  if (RegExp(userConfig.password_regex).test(password)) {
    return next();
  }
  return next(errors.badRequest('Not valid password'));
};
exports.validateEmail = (req, res, next) => {
  const { email } = req.body;
  log.info(email);
  log.info(userConfig.email_regex);
  if (RegExp(userConfig.email_regex).test(email)) {
    return next();
  }
  return next(errors.badRequest('Not valid email'));
};
