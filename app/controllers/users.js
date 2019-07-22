const usersService = require('../services/user');
const log = require('../logger');
const { validationResult } = require('express-validator');
const errorsDefinition = require('../errors');

exports.addUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errorsDefinition.badRequest(errors.array()[0].msg));
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

exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errorsDefinition.badRequest(errors.array()[0].msg));
  }
  return usersService
    .loginUser(req.body)
    .then(token => {
      res
        .json({ token })
        .status(201)
        .send();
    })
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
};
