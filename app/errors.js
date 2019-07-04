const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.CONECTION_ERROR = 'connection_error';
exports.conectionError = message => internalError(message, exports.CONECTION_ERROR);

exports.BAD_REQUEST = 'bad_request';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.FORBIDDEN_USER = 'forbidden_user';
exports.forbiddenUser = message => internalError(message, exports.FORBIDDEN_USER);
