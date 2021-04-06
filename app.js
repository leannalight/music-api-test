const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const sequelize = require('./database/config');
const Sequelize = require('sequelize');

const Artist = require('./models/artist');
const Song = require('./models/song');

const app = express();

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

Artist.hasMany(Song, {
  foreignKey: 'artistId'
});

Song.belongsTo(Artist, {
  foreignKey: 'artistId'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync();

// Artist routes
app.use('/artists', require('./routes/artists'));

// Song routes
app.use('/songs', require('./routes/songs'));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});