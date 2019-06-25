/* eslint-disable new-cap */

const express = require('express');

const config = require('../../config').common.albums;

const albumsRouter = express.Router();

albumsRouter.get('/', (req, res) => {
  const albums = fetch(config.api_url);
  res.status(200).send(albums);
});

module.exports = albumsRouter;
