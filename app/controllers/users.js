const services = require('../services/userService');
const log = require('../logger');

module.exports = {
  addUser: (req, res, next) => {
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
