module.exports = {
  checkUserProperties: (req, res, next) => {
    const { query } = req;
    if (query.firstName && query.lastName && query.email && query.password) {
      next();
    }
    const err = new Error('User atributte missing');
    err.internalCode = 'BAD_REQUEST';
    next(err);
  },
  validatePassword: (req, res, next) => {
    const { password } = req.query;
    if (password.length < 8) {
      const err = new Error('Password is too short');
      err.internalCode = 'BAD_REQUEST';
      next(err);
    }
    next();
  }
};
