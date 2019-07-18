const moment = require('moment');

const User = require('../models').users;

exports.validateToken = async tokenDecoded => {
  const user = await User.findOne({ where: { email: tokenDecoded.email } });
  if (!user.timestampTokenCreation) {
    return false;
  }
  return moment(user.timestampTokenCreation).isSameOrBefore(moment(tokenDecoded.tokenCreation).format());
};
