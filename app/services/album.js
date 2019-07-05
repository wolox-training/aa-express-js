const fetch = require('node-fetch');

const config = require('../../config').common.albums;
const errors = require('../errors');
const db = require('../models');

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

exports.buyAlbum = async (albumId, userEmail) => {
  const endpoint = `${config.api_url}/albums/${albumId}`;
  try {
    const user = await db.users.find({ where: { email: userEmail } });
    const response = await fetch(endpoint);
    if (response.status !== 200) {
      throw errors.conectionError('Error calling api');
    }
    if (!response.json()) {
      throw errors.badRequest('The album not does exist');
    }
    const transaction = await db.albums_transactions.find({ where: { userId: user.id, albumId } });
    if (transaction) {
      throw errors.badRequest('The transaction was alredy made');
    }
    const result = await db.albums_transactions.create({
      userId: user.id,
      albumId
    });
    return result;
  } catch (e) {
    if (!e.internalCode) {
      throw errors.defaultError(e.message);
    }
    throw e;
  }
};
