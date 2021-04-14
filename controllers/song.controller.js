const Song = require('../models/song');
const Artist = require('../models/artist');

// получить все песни (всех исполнителей) / по части названия
module.exports.getSongs = (req, res) => {
  let filter = {};
  let { q } = req.query;

  if (q) {
    filter = {
      where: {
        title: {
          [Op.like]: `${q}%`
        }
      }
    };
  }
  Song.findAll(filter)
  .then((songs) => res.status(200).send(songs))
  .catch((error) => res.status(400).send(error));
}

// получить песню по id
module.exports.getSongById = (req, res) => {
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

// изменить запись о песне
module.exports.updateSong = (req, res) => {
  let { id } = req.params;

  Song
    .findByPk(id, {
      include: [Artist]
    })
    .then((song) => {
      if (!song) {
        return res.status(404).send({
          message: 'Song Not Found',
        });
      }
      return song
        .update({
          title: req.body.title || song.title
        })
        .then(() => res.status(200).send(song))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}

// удалить запись о песне
module.exports.deleteSong = (req, res) => {
  let { id } = req.params;

  Song
    .findByPk(id)
    .then((song) => {
      if (!song) {
        return res.status(404).send({
          message: 'Song Not Found'
        });
      }
      return song
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
}
