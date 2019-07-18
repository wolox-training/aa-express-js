const albumsService = require('../services/album');
const log = require('../logger');

exports.getAlbums = (req, res, next) =>
  albumsService
    .getAlbums()
    .then(albums => res.status(200).send(albums))
    .catch(err => {
      log.error(err.message);
      return next(err);
    });

exports.getPhotoOfAlbum = (req, res, next) => {
  const albumId = req.params.id;
  return albumsService
    .getPhotosOfAlbum(albumId)
    .then(photos => res.status(200).send(photos))
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
};

exports.buyAlbum = (req, res, next) => {
  const albumId = req.params.id;
  return albumsService
    .buyAlbum(albumId, req.decode.email)
    .then(album => res.status(200).send(album))
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
};
