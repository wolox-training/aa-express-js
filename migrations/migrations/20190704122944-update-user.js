'use strict';
const bcrypt = require('bcryptjs');
const moment = require('moment');

const saltRounds = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'admin', Sequelize.BOOLEAN, {
      allowNull: false
    });
    return bcrypt.hash('adminadmin', saltRounds).then(hash =>
      queryInterface.bulkInsert('users', [
        {
          first_name: 'admin',
          last_name: 'admin',
          email: 'admin@wolox.com.ar',
          password: hash,
          admin: true,
          created_at: moment().format(),
          updated_at: moment().format()
        }
      ])
    );
  },

  down: queryInterface => queryInterface.removeColumn('users', 'admin')
};
