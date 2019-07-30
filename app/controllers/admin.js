const services = require('../services/user');
const log = require('../logger');

exports.addAdminUser = (req, res, next) =>
  services
    .createAdminUser(req.body)
    .then(result => {
      log.info(`User created as admin first name: ${result.firstName}, last name: ${result.lastName}`);
      return result;
    })
    .then(result => res.status(201).send(result))
    .catch(e => {
      log.error(e.message);
      return next(e);
    });
