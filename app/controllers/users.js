const services = require('../services/userService');
const log = require('../logger');

module.exports = {
  addUser: (req, res, next) => {
    if (!services.checkUserProperties(req.query)) {
      const err = new Error('User atributte missing');
      err.internalCode = 'BAD_REQUEST';
      next(err);
    }
    if (!services.validatePassword(req.query.password)) {
      const err = new Error('Password is too short');
      err.internalCode = 'BAD_REQUEST';
      next(err);
    }
    services
      .createUser(req.query)
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
        next(err);
      });
  }
};
