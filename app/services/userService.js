const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../models');
const secretKey = require('../../config').common.jwt.secret_key;
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
  },
  loginUser: async body => {
    if (!body.email || !body.password) {
      throw new Error('Missing attribute');
    }
    try {
      const result = await db.User.findAll({
        where: {
          email: body.email
        }
      });
      if (result.length === 0) {
        throw new Error('User not found');
      }
      return bcrypt.compare(body.password, result[0].password).then(res => {
        if (!res) {
          throw new Error('Wrong password');
        }
        return jwt.sign({ email: body.email }, secretKey);
      });
    } catch (e) {
      throw e;
    }
  }
};
