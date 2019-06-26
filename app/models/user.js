const db = require('../models');

const { Model } = db.Sequelize;
const sequalize = db.sequelize;

class User extends Model {}
User.init(
  {
    id: {
      type: db.Sequalize.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isNotNull: true
      }
    },
    name: {
      type: db.Sequalize.STRING,
      validate: {
        isNotNull: true
      }
    },
    lastName: {
      type: db.Sequalize.STRING,
      validate: {
        isNotNull: true
      }
    },
    email: {
      type: db.Sequalize.STRING,
      unique: true,
      validate: {
        isNotNull: true,
        isEmail: true
      }
    },
    password: {
      type: db.Sequalize.STRING,
      validate: {
        isNotNull: true
      }
    }
  },
  { sequalize, modelName: 'user' }
);
