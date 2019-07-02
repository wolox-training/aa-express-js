const albumService = require('../services/album');
const log = require('../logger');

module.exports = {
  getAlbums: (req, res, next) => {
    albumService
      .getAlbums()
      .then(response => response.json())
      .then(albums => {
        res.status(200).send(albums);
      })
      .catch(err => {
        log.error(err.message);
        err.internalCode = 'CONECTION_ERROR';
        next(err);
      });
  },

  getPhotoOfAlbum: (req, res, next) => {
    const albumId = req.params.id;
    albumService
      .getPhotosOfAlbum(albumId)
      .then(photos => {
        res.status(200).send(photos);
      })
      .catch(err => {
        log.error(err.message);
        err.internalCode = 'CONECTION_ERROR';
        next(err);
      });
  }
};
