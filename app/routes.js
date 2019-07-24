const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/album.js');
const userController = require('./controllers/users');
const userMiddle = require('./middlewares/user');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albumsController.getAlbums);
  app.get('/albums/:id/photos', albumsController.getPhotoOfAlbum);
  app.post('/users', userMiddle.createUser, userController.addUser);
  app.post('/users/sessions', userMiddle.loginUser, userController.loginUser);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
