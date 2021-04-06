const express = require('express');
const router = express.Router();
const { createArtist,
        getArtists,
        getArtistById,
        deleteArtist,
        updateArtist } = require('../controllers/artist.controller');

router.post('/', createArtist);
router.get('/', getArtists);
router.get('/:id', getArtistById);
router.delete('/:id', deleteArtist);
router.put('/:id', updateArtist);


module.exports = router;