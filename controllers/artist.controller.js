const Artist = require('../models/artist');
const Song = require('../models/song');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

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
  Artist.findAll(filter).then((artists) => {
    res.json(artists);
  });
};

module.exports.createArtist = (req, res) => {
  Artist.create({
    name: req.body.name
  }).then((artist) => {
    res.json(artist);
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

module.exports.getArtistById = (req, res) => {
  let { id } = req.params;

  Artist.findByPk(id, {
    include: [Song]
  }).then((artist) => {
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send();
    }
  });
};

module.exports.deleteArtist = (req, res) => {
  let { id } = req.params;

  Artist
    .findByPk(id)
    .then((artist) => {
      if (artist) {
        return artist.setSongs([]).then(() => {
          return artist.destroy();
        });
      } else {
        return Promise.reject();
      }
    })
    .then(() => {
      res.status(204).send();
    }, () => {
      res.status(404).send();
    });
};

module.exports.updateArtist = (req, res) => {
  let { id } = req.params;

  Artist
    .findByPk(id)
    .then((artist) => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist is not found'
        });
      }
      return artist
        .update({
          name: req.body.name || artist.name
        })
        .then(() => res.status(200).send(artist))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};
