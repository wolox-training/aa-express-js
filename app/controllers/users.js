const usersService = require('../services/user');
const log = require('../logger');

exports.addUser = (req, res, next) =>
  usersService
    .createUser(req.body)
    .then(result => {
      log.info(`User created first name: ${result.firstName}, last name: ${result.lastName}`);
      return result;
    })
    .then(result =>
      res
        .json(result)
        .status(201)
        .send()
    )
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
exports.loginUser = (req, res, next) =>
  usersService
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
exports.getUsers = (req, res, next) =>
  usersService
    .getUsers(req.query)
    .then(users => res.status(200).send(users))
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
