const fetch = require('node-fetch');

const config = require('../../config').common.albums;
const errors = require('../errors');

exports.getAlbums = async () => {
  try {
    const endpoint = `${config.api_url}/albums`;
    const response = await fetch(endpoint);
    if (response.status !== 200) {
      throw errors.conectionError('Error calling api');
    }
    return response.json();
  } catch (e) {
    throw errors.conectionError(e.message);
  }
};

exports.getAlbum = async albumId => {
  try {
    const endpoint = `${config.api_url}/albums/${albumId}`;
    const response = await fetch(endpoint);
    if (response.status !== 200) {
      throw errors.conectionError('Error calling api');
    }
    return response.json();
  } catch (e) {
    throw errors.conectionError(e.message);
  }
};

exports.getPhotosOfAlbum = async albumId => {
  const query = `?albumId=${albumId}`;
  const endpoint = `${config.api_url}/photos${query}`;
  try {
    const response = await fetch(endpoint);
    if (response.status !== 200) {
      throw errors.conectionError('Error calling api');
    }
    const photos = await response.json();
    return photos;
  } catch (e) {
    throw errors.conectionError(e.message);
  }
};

exports.getAlbum = async albumId => {
  const endpoint = `${config.api_url}/albums/${albumId}`;
  try {
    const album = await fetch(endpoint);
    if (album.status !== 200) {
      throw errors.conectionError('Error calling api');
    }
    if (!album) {
      throw errors.badRequest('The album not does exist');
    }
    return album.json();
  } catch (e) {
    if (!e.internalCode) {
      throw errors.defaultError(e.message);
    }
    throw e;
  }
};
