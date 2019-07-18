'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'timestamp_token_creation', Sequelize.DATE, {
      allowNull: true
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'timestamp_token_creation')
};
