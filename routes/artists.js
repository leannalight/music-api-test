const express = require('express');
const router = express.Router();
const { addArtist,
        createArtist,
        getArtists,
        getArtistById,
        deleteArtist,
        updateArtist,
        addSong,
        getSongs } = require('../controllers/artist.controller');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/create', addArtist);
router.post('/create', urlencodedParser, createArtist);
router.get('/', getArtists);
// получаем объект по id для редактирования
router.get('/edit/:id', getArtistById);
// обновляем данные в БД
router.post('/edit', urlencodedParser, updateArtist);
router.post('/delete/:id', deleteArtist);

// добавить песню исполнителю
router.post('/add/:id', addSong);
// получить все песни определенного исполнителя
router.get('/get/:id', getSongs);

module.exports = router;