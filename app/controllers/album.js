const albumsService = require('../services/album');
const transactionsService = require('../services/transactions');
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
    .then(albumsPhotos => res.status(200).send(albumsPhotos))
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
};

exports.buyAlbum = (req, res, next) => {
  const albumId = req.params.id;
  const { email } = req.decode;
  return albumsService
    .getAlbum(albumId)
    .then(album => transactionsService.buyAlbum(email, album))
    .then(() => res.status(200).send())
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
};
