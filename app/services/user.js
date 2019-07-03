const bcrypt = require('bcryptjs');

const db = require('../models');
const saltRounds = 10;

exports.createUser = query => {
  try {
    return bcrypt.hash(query.password, saltRounds).then(async hash => {
      try {
        const result = await db.users.create({
          firstName: query.firstName,
          lastName: query.lastName,
          email: query.email,
          password: hash
        });
        return result;
      } catch (e) {
        if (e.message === 'Validation error') {
          e.internalCode = 'bad_request';
          throw e;
        }
        e.internalCode = 'database_error';
        throw e;
      }
    });
  } catch (e) {
    e.internalCode = 'database_error';
    throw e;
  }
};
