const db = require('../models');

module.exports = {
  checkUserProperties: query => {
    if (
      query.hasProperty('firstName') &&
      query.hasProperty('lastName') &&
      query.hasProperty('email') &&
      query.hasProperty('password')
    ) {
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
  }
};
