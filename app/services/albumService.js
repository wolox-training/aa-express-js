const config = require('../../config').common.albums;

module.exports = {
  getAlbums: async () => {
    try {
      const res = await fetch(config.api_url);
      return res;
    } catch (e) {
      throw e;
    }
  }
};
