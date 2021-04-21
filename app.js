const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const artistRouter = require('./routes/artists');
const songRouter = require('./routes/songs');

// Database
const sequelize = require('./database/config');
const Sequelize = require('sequelize');

// Логирование запросов
const { requestLogger } = require('./middlewares/logger');

const app = express();

// Handlebars, register view engine
app.set('view engine', 'hbs');

// cors configuration
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
};

// activate cors
app.use(cors(corsOptions));

// Body parser
app.use(bodyParser.json());

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync();

// подключаем логгер запросов
app.use(requestLogger);

// Artist routes
app.use('/artists', artistRouter);
// Song routes
app.use('/songs', songRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});