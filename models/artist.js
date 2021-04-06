const Sequelize = require('sequelize');
const sequelize = require('../database/config');

 const Artist = sequelize.define('artist', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Name is required'
      },
      len: {
        args: [2, 10],
        msg: 'Name must be between 2 and 20 characters'
      }
    }
  }
});

module.exports = Artist;