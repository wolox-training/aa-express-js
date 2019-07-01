const services = require('../services/userService');
const log = require('../logger');

module.exports = {
  addUser: (req, res, next) => {
    services
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
        err.internalCode = 'database_error';
        log.error(err.message);
        next(err);
      });
  },
  loginUser: (req, res, next) => {
    services
      .loginUser(req.body)
      .then(token => {
        res
          .json({ token })
          .status(201)
          .send();
      })
      .catch(err => {
        err.internalCode = 'bad_request';
        log.error(err.message);
        next(err);
      });
  }
};
