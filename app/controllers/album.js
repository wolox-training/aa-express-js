/* eslint-disable new-cap */

const express = require('express');

const albumService = require('../services/albumService');
const log = require('../logger');

const albumsRouter = express.Router();

albumsRouter.get('/', (req, res, next) => {
  albumService
    .getAlbums()
    .then(response => response.json())
    .then(albums => {
      log.info(albums);
      res.status(200).send(albums);
    })
    .catch(err => {
      log.error(err.message);
      err.internalCode = 'CONECTION_ERROR';
      next(err);
    });
});

module.exports = albumsRouter;
