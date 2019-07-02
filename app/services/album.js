const fetch = require('node-fetch');

const config = require('../../config').common.albums;

exports.getAlbums = async () => {
  try {
    const endpoint = `${config.api_url}/albums`;
    const response = await fetch(endpoint);
    if (response.status !== 200) {
      throw new Error('Error calling api');
    }
    return response.json();
  } catch (e) {
    throw e;
  }
};

exports.getPhotosOfAlbum = async albumId => {
  const query = `?albumId=${albumId}`;
  const endpoint = `${config.api_url}/photos${query}`;
  try {
    const response = await fetch(endpoint);
    if (response.status !== 200) {
      throw new Error('Error calling api');
    }
    const photos = await response.json();
    return photos;
  } catch (e) {
    throw e;
  }
};
