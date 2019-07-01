const bcrypt = require('bcryptjs');

const db = require('../models');
const saltRounds = 10;

module.exports = {
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
  }
};
