'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'admin', Sequelize.BOOLEAN, {
      allowNull: false
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'admin')
};
