const request = require('supertest');
const Chance = require('chance');

const app = require('../app');

const chance = new Chance();

const fetchMock = require('./__mocks__/node-fetch');
const { getPhotosFetch } = require('./__mocks__/photosFetch');
const mockAlbumPhotos = require('./__mocks__/photosFetch').albumPhotos;
fetchMock.get('begin:https://jsonplaceholder.typicode.com/photos', getPhotosFetch);

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
      .expect(201);
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
    expect(album.body).toMatchObject(mockAlbumPhotos[1]);
  });
  test('Try To Get Photos Of Album Not Bought', async () => {
    const user = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/albums/2')
      .set('token', user.body.token)
      .send()
      .expect(200);
    await request(app)
      .get('/users/albums/1/photos')
      .set('token', user.body.token)
      .send()
      .expect(400);
  });
  test('Correct Get Photo From More Than One Album', async () => {
    let album = [];
    const user = await request(app)
      .post('/users/sessions')
      .send(firstRightQuery)
      .expect(200);
    await request(app)
      .post('/albums/1')
      .set('token', user.body.token)
      .send()
      .expect(200);
    await request(app)
      .post('/albums/2')
      .set('token', user.body.token)
      .send()
      .expect(200);
    await request(app)
      .post('/albums/4')
      .set('token', user.body.token)
      .send()
      .expect(200);
    album = await request(app)
      .get('/users/albums/1/photos')
      .set('token', user.body.token)
      .send()
      .expect(200);
    expect(album.body).toMatchObject(mockAlbumPhotos[1]);
    album = await request(app)
      .get('/users/albums/2/photos')
      .set('token', user.body.token)
      .send()
      .expect(200);
    expect(album.body).toMatchObject(mockAlbumPhotos[2]);
    album = await request(app)
      .get('/users/albums/4/photos')
      .set('token', user.body.token)
      .send()
      .expect(200);
    expect(album.body).toMatchObject(mockAlbumPhotos[4]);
  });
});
