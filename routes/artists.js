const express = require('express');
const router = express.Router();
const { createArtist,
        getArtists,
        getArtistById,
        deleteArtist,
        updateArtist,
        addSong,
        getSongs } = require('../controllers/artist.controller');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/create', function(req, res){
  res.render("create.hbs");
});

router.post('/create', urlencodedParser, createArtist);
router.get('/', getArtists);
router.get('/edit/:id', getArtistById);
router.get('/:id', getArtistById);
router.put('/edit/:id', urlencodedParser, updateArtist);
router.delete('/delete/:id', deleteArtist);

// добавить песню исполнителю
router.post('/add/:id', addSong);
// получить все песни определенного исполнителя
router.get('/get/:id', getSongs);

module.exports = router;