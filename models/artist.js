const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const Song = require('./song');

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
        args: [2, 20],
        msg: 'Name must be between 2 and 20 characters'
      }
    }
  }
});

Artist.hasMany(Song, {
  foreignKey: 'artistId',
  onDelete: 'cascade'
});

Song.belongsTo(Artist, {
  foreignKey: 'artistId'
});

module.exports = Artist;