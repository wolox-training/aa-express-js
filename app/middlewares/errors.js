const errors = require('../errors'),
  logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.CONNECTION_ERROR]: 502,
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500,
  [errors.BAD_REQUEST]: 400,
  [errors.FORBIDDEN_USER]: 403,
  [errors.NOT_FOUND]: 404
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
