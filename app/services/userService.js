// const bcrypt = require('bcryptjs');

const db = require('../models');

module.exports = {
  checkUserProperties: query => {
    if (query.firstName && query.lastName && query.email && query.password) {
      return true;
    }
    return false;
  },
  createUser: async query => {
    try {
      const result = await db.User.create({
        firstName: query.firstName,
        lastName: query.lastName,
        email: query.email,
        password: query.password
      });
      return result;
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
