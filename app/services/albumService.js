const fetch = require('node-fetch');

const config = require('../../config').common.albums;

module.exports = {
  getAlbums: async () => {
    try {
      const endpoint = `${config.api_url}/albums`;
      const response = await fetch(endpoint);
      if (response.status !== 200) {
        throw new Error('Error calling api');
      }
      return response;
    } catch (e) {
      throw e;
    }
  },
  getPhotosOfAlbum: async albumId => {
    const endpoint = `${config.api_url}/photos`;
    try {
      const response = await fetch(endpoint);
      if (response.status !== 200) {
        throw new Error('Error calling api');
      }
      const photos = await response.json();
      return photos.filter(photo => photo.albumId === Number(albumId));
    } catch (e) {
      throw e;
    }
  }
};
