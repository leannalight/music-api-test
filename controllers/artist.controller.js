const Artist = require('../models/artist');
const Song = require('../models/song');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

// получить всех исполнителей / по части названия
module.exports.getArtists = (req, res) => {
  let filter = {};
  let { q } = req.query;

  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }
  Artist.findAll(filter).then((data) => {
    res.render('artists', {
      artists: data
    });
  });
};

// добавить исполнителя
module.exports.addArtist = (req, res) => {
  res.render('create');
}

// создать запись об исполнителе
module.exports.createArtist = (req, res) => {

  if(!req.body) return res.status(400).send();

  Artist
    .create({
      name: req.body.name
    })
    .then(() => {
      res.redirect('/artists');
  }, (validation) => {
      res.status(422).json({
        errors: validation.errors.map((error) => {
          return {
            attribute: error.path,
            message: error.message
          };
        })
      });
    });
};

// получить запись об исполнителе по id
module.exports.getArtistById = (req, res) => {
  const artistId = req.params.id;

  Artist.findAll({ where: { id: artistId } })
    .then((data) => {
      res.render('edit', {
        artist: data[0]
      });
    })
    .catch((error) => res.status(404).send(error));
};

// изменить запись об исполнителе
module.exports.updateArtist = (req, res) => {

  if(!req.body) return res.status(400).send();

  const artistName = req.body.name;
  const artistId = req.body.id;

  Artist
    .update({ name: artistName }, { where: { id: artistId } })
      .then(() => {
        res.redirect('/artists');
      })
      .catch((error) => res.status(400).send(error));
}

// удалить запись об исполнителе
module.exports.deleteArtist = (req, res) => {
  const artistId = req.params.id;

  Artist.destroy({ where: {id: artistId} })
    .then(() => {
      res.redirect('/artists');
    })
    .catch((error) => res.status(400).send(error))
}

// добавить песню исполнителю
module.exports.addSong = (req, res) => {
  let { id } = req.params;

  Artist
    .findByPk(id)
    .then((artist) => {
      if(!artist) {
        return res.status(404).send({
          message: 'Artist not found',
        });
      }
      return artist.createSong({
        title: req.body.title
      })
      .then((artist) => res.status(201).send(artist))
      })
      .catch((error) => res.status(400).send(error));
}

// получить все песни определенного исполнителя
module.exports.getSongs = (req, res) => {
  let { id } = req.params;

  Artist
    .findByPk(id)
    .then((artist) => {
      if(!artist) {
        return res.status(404).send({
          message: 'Artist not found',
        });
      }

    return artist.getSongs()
      .then((songs) => {
        for (let i = 0; i < songs.length; i++) {
          console.log(songs[i].title, " - ", artist.name);
          return res.status(200).send(songs);
        }
      })
      .catch((error) => res.status(400).send(error))
    }).catch((error) => res.status(400).send(error))
}