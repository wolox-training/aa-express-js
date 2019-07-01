module.exports = {
  checkUserProperties: (req, res, next) => {
    const { body } = req;
    if (body.firstName && body.lastName && body.email && body.password) {
      return next();
    }
    const err = new Error('User atributte missing');
    err.internalCode = 'bad_request';
    return next(err);
  },
  validatePassword: (req, res, next) => {
    const { password } = req.body;
    if (password.length >= 8) {
      return next();
    }
    const err = new Error('Password is too short');
    err.internalCode = 'bad_request';
    return next(err);
  }
};
