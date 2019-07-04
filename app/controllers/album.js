const albumService = require('../services/album');
const log = require('../logger');

exports.getAlbums = (req, res, next) =>
  albumService
    .getAlbums()
    .then(albums => {
      res.status(200).send(albums);
    })
    .catch(err => {
      log.error(err.message);
      next(err);
    });

exports.getPhotoOfAlbum = (req, res, next) => {
  const albumId = req.params.id;
  return albumService
    .getPhotosOfAlbum(albumId)
    .then(photos => {
      res.status(200).send(photos);
    })
    .catch(err => {
      log.error(err.message);
      next(err);
    });
};
