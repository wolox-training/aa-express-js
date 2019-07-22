const usersService = require('../services/user');
const log = require('../logger');
const { validationResult } = require('express-validator');
const errorsDefinition = require('../errors');

exports.addUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errorsDefinition.badRequest(errors.array()[0].msg));
  }
  return usersService
    .createUser(req.body)
    .then(result => {
      log.info(`User created first name: ${result.firstName}, last name: ${result.lastName}`);
      return result;
    })
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
};
