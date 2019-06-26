const XHR = require(XMLHttpRequest);

const config = require('../../config').common.albums;

module.exports = {
    getAlbums : () => {
        const xhr = new XHR();
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return xhr.response
          }
        };
        xhr.open('GET', config.api_url);
        xhr.send();
    }
}