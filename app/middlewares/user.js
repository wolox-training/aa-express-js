const userConfig = require('../../config').common.user;

exports.checkUserProperties = (req, res, next) => {
  const { body } = req;
  if (body.firstName && body.lastName && body.email && body.password) {
    return next();
  }
  const err = new Error('User attribute missing');
  err.internalCode = 'bad_request';
  return next(err);
};
exports.validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (RegExp(userConfig.password_regex).test(password)) {
    return next();
  }
  const err = new Error('Not valid password');
  err.internalCode = 'bad_request';
  return next(err);
};
exports.validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (RegExp(userConfig.email_regex).test(email)) {
    return next();
  }
  const err = new Error('Not valid email');
  err.internalCode = 'bad_request';
  return next(err);
};
