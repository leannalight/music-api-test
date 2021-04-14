const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Database
const sequelize = require('./database/config');
const Sequelize = require('sequelize');

// Логирование запросов
const { requestLogger } = require('./middlewares/logger');

const app = express();

// cors configuration
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
};

// activate cors
app.use(cors(corsOptions));

// Handlebars
app.set('view engine', 'hbs');

// Body parser
app.use(bodyParser.json());

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync();

// подключаем логгер запросов
app.use(requestLogger);

// Artist routes
app.use('/artists', require('./routes/artists'));

// Song routes
app.use('/songs', require('./routes/songs'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});