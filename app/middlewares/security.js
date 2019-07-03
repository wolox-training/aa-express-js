const jwt = require('jsonwebtoken');

const secretKey = require('../../config').common.jwt.secret_key;

exports.checkToken = (req, res, next) => {
  const { token } = req.headers;
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    const decode = jwt.verify(token, secretKey);
    req.decode = decode;
    next();
  } catch (e) {
    e.internalCode = 'forbidden_user';
    next(e);
  }
};
