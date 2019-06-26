'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          isNotNull: true
        }
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          isNotNull: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          isNotNull: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isNotNull: true,
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          isNotNull: true
        }
      }
    },
    {}
  );
  return User;
};
