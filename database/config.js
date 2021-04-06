const Sequelize = require('sequelize');

module.exports = new Sequelize('musicdb3', 'postgres', '567789', {
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});