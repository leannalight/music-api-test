const Song = require('../models/song');
const Artist = require('../models/artist');

module.exports.getSong = (req, res) => {
  let { id } = req.params;

  Song.findByPk(id, {
    include: [Artist]
  }).then((song) => {
    if (song) {
      res.json(song);
    } else {
      res.status(404).send();
    }
  });
}