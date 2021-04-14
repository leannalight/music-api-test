const express = require('express');
const router = express.Router();
const { getSongs,
        getSongById,
        updateSong,
        deleteSong } = require('../controllers/song.controller');

router.get('/', getSongs);
router.get('/:id', getSongById);
router.put('/edit/:id', updateSong);
router.delete('/delete/:id', deleteSong);


module.exports = router;