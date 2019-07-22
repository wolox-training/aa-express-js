const { check } = require('express-validator');

const userConfig = require('../../config').common.user;

const checkAttributesMissing = value => {
  if (!value) {
    return Promise.reject(new Error('User attribute missing'));
  }
  return Promise.resolve();
};

exports.createUser = [
  check('firstName').custom(checkAttributesMissing),
  check('lastName').custom(checkAttributesMissing),
  check('email')
    .custom(checkAttributesMissing)
    .isEmail()
    .withMessage('Not valid email')
    .contains(userConfig.email_domain)
    .withMessage('Not wolox email'),
  check('password')
    .custom(checkAttributesMissing)
    .isAlphanumeric()
    .withMessage('Not alphanumeric password')
    .isLength({ min: userConfig.password_length })
    .withMessage('Not long enough password')
];
