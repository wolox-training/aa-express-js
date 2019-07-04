const services = require('../services/user');
const log = require('../logger');
const errors = require('../errors');

exports.addAdminUser = (req, res, next) => {
  if (!req.decode.admin) {
    return next(errors.forbiddenUser('Only admin can use this'));
  }
  return services
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
};
