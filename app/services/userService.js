const bcrypt = require('bcryptjs');

const db = require('../models');
const saltRounds = 10;

module.exports = {
  checkUserProperties: query => {
    if (query.firstName && query.lastName && query.email && query.password) {
      return true;
    }
    return false;
  },
  createUser: query => {
    try {
      return bcrypt.hash(query.password, saltRounds).then(async hash => {
        const result = await db.User.create({
          firstName: query.firstName,
          lastName: query.lastName,
          email: query.email,
          password: hash
        });
        return result;
      });
    } catch (e) {
      throw e;
    }
  },
  validatePassword: password => {
    if (password.length >= 8) {
      return true;
    }
    return false;
  }
};
