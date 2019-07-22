const { check, validationResult } = require('express-validator');

const userConfig = require('../../config').common.user;
const errors = require('../errors');

exports.validate = (req, res, next) => {
  const errorsMessages = validationResult(req).array();
  if (errorsMessages.length !== 0) {
    return next(errors.badRequest(errorsMessages.map(error => error.msg)));
  }
  return next();
};
exports.createUser = [
  check('firstName')
    .exists()
    .withMessage('First name attribute is missing'),
  check('lastName')
    .exists()
    .withMessage('Last name attribute is missing'),
  check('email')
    .exists()
    .withMessage('Email attribute is missing')
    .isEmail()
    .withMessage('Not valid email')
    .contains(userConfig.email_domain)
    .withMessage('Not wolox email'),
  check('password')
    .exists()
    .withMessage('Password attribute is missing')
    .isAlphanumeric()
    .withMessage('Not alphanumeric password')
    .isLength({ min: userConfig.password_length })
    .withMessage('Not long enough password'),
  exports.validate
];

exports.loginUser = [
  check('email')
    .isEmail()
    .withMessage('Not valid email')
    .contains(userConfig.email_domain)
    .withMessage('Not wolox email'),
  check('password')
    .isAlphanumeric()
    .withMessage('Not alphanumeric password')
    .isLength({ min: userConfig.password_length })
    .withMessage('Not long enough password')
];
