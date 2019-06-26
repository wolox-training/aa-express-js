const fetch = require('node-fetch');

const config = require('../../config').common.albums;

module.exports = {
  getAlbums: async () => {
    try {
      const response = await fetch(config.api_url);
      if (response.status !== 200) {
        throw new Error('Error calling api');
      }
      return response;
    } catch (e) {
      throw e;
    }
  }
};
