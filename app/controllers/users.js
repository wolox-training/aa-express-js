const services = require('../services/user');
const log = require('../logger');

exports.addUser = (req, res, next) => {
  if (!services.checkUserProperties(req.body)) {
    const err = new Error('User atributte missing');
    err.internalCode = 'bad_request';
    return next(err);
  }
  if (!services.validatePassword(req.body.password)) {
    const err = new Error('Password is not valid');
    err.internalCode = 'bad_request';
    return next(err);
  }
  if (!services.validateEmail(req.body.email)) {
    const err = new Error('Email is not valid');
    err.internalCode = 'bad_request';
    return next(err);
  }
  return services
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
      err.internalCode = 'DATABASE_ERROR';
      log.error(err.message);
      return next(err);
    });
};
