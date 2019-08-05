const moment = require('moment');

const User = require('../models').users;
const errors = require('../errors');

exports.validateToken = async tokenDecoded => {
  const user = await User.findOne({ where: { email: tokenDecoded.email } });
  if (!user) {
    throw errors.notFound('User not exist');
  }
  return (
    user.timestampTokenCreation &&
    moment(user.timestampTokenCreation).isSameOrBefore(moment.unix(tokenDecoded.iat).format())
  );
};
