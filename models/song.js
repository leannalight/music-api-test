const sequelize = require('../database/config');
const Sequelize = require('sequelize');

 const Song = sequelize.define('song', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Song;