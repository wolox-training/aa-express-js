const services = require('../services/userService');

module.exports = {
  addUser: (req, res, next) => {
    if (!services.checkUserProperties(req.query)) {
      const err = new Error('User atributte missing');
      err.internalCode = 'BAD_REQUEST';
      next(err);
    }
    services
      .createUser(req.query)
      .then(result =>
        res
          .json(result)
          .status(201)
          .send()
      )
      .catch(err => {
        err.internalCode = 'DATABASE_ERROR';
        next(err);
      });
  }
};
