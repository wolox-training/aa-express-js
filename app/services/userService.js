const bcrypt = require('bcryptjs');

const db = require('../models');
const saltRounds = 10;

module.exports = {
  createUser: body => {
    try {
      return bcrypt.hash(body.password, saltRounds).then(async hash => {
        const result = await db.User.create({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: hash
        });
        return result;
      });
    } catch (e) {
      throw e;
    }
  }
};
