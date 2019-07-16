const urlParser = require('url');

exports.albumPhotos = {
  1: [
    {
      albumId: 1,
      id: 1,
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952'
    },
    {
      albumId: 1,
      id: 2,
      title: 'reprehenderit est deserunt velit ipsam',
      url: 'https://via.placeholder.com/600/771796',
      thumbnailUrl: 'https://via.placeholder.com/150/771796'
    }
  ],
  2: [
    {
      albumId: 2,
      id: 51,
      title: 'non sunt voluptatem placeat consequuntur rem incidunt',
      url: 'https://via.placeholder.com/600/8e973b',
      thumbnailUrl: 'https://via.placeholder.com/150/8e973b'
    },
    {
      albumId: 2,
      id: 52,
      title: 'eveniet pariatur quia nobis reiciendis laboriosam ea',
      url: 'https://via.placeholder.com/600/121fa4',
      thumbnailUrl: 'https://via.placeholder.com/150/121fa4'
    }
  ],
  4: [
    {
      albumId: 4,
      id: 151,
      title: 'possimus dolor minima provident ipsam',
      url: 'https://via.placeholder.com/600/1d2ad4',
      thumbnailUrl: 'https://via.placeholder.com/150/1d2ad4'
    },
    {
      albumId: 4,
      id: 152,
      title: 'et accusantium enim pariatur eum nihil fugit',
      url: 'https://via.placeholder.com/600/a01c5b',
      thumbnailUrl: 'https://via.placeholder.com/150/a01c5b'
    }
  ]
};

exports.photosFetch = url => {
  const { query } = urlParser.parse(url, true);
  return Promise.resolve(JSON.stringify(exports.albumPhotos[query.albumId]));
};
