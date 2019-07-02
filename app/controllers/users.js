const services = require('../services/user');
const log = require('../logger');

exports.addUser = (req, res, next) =>
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
      log.error(err.message);
      return next(err);
    });
