const express = require('express');
const router = express.Router();
const { getSong } = require('../controllers/song.controller');

// router.post('/', );
// router.get('/', );
router.get('/:id', getSong);
// router.delete('/:id', );


module.exports = router;