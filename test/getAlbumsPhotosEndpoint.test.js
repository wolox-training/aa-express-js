const request = require('supertest');
const Chance = require('chance');

const app = require('../app');

const chance = new Chance();
jest.mock('../app/services/album', () => ({
  getPhotosOfAlbum: jest.fn(() => [
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
  ])
}));

const firstRightQuery = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: 'wolox.com.ar' }),
  password: chance.string({ length: 10, pool: 'asdfghjkl147258369' })
};

describe('Get Photo Of An Album Bougth', () => {
  beforeEach(async done => {
    await request(app)
      .post('/users')
      .send(firstRightQuery)
      .expect(200);
    done();
  });
  test('Correct Get Photo', async () => {
    const user = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/albums/1')
      .set('token', user.body.token)
      .send()
      .expect(200);
    const album = await request(app)
      .get('/users/albums/1/photos')
      .set('token', user.body.token)
      .send()
      .expect(200);
    console.log(album);
  });
});
