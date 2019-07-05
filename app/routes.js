// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/album.js');
const userController = require('./controllers/users');
const adminController = require('./controllers/admin');
const userMiddle = require('./middlewares/user');
const securityMiddle = require('./middlewares/security');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albumsController.getAlbums);
  app.post('/albums/:id', [securityMiddle.checkToken], albumsController.buyAlbum);
  app.get('/albums/:id/photos', albumsController.getPhotoOfAlbum);
  app.post(
    '/users',
    [userMiddle.checkUserProperties, userMiddle.validateEmail, userMiddle.validatePassword],
    userController.addUser
  );
  app.get('/users', [securityMiddle.checkToken], userController.getUsers);
  app.post(
    '/users/sessions',
    [userMiddle.validateEmail, userMiddle.validatePassword],
    userController.loginUser
  );
  app.post(
    '/admin/users',
    [
      userMiddle.checkUserProperties,
      userMiddle.validateEmail,
      userMiddle.validatePassword,
      securityMiddle.checkToken
    ],
    adminController.addAdminUser
  );
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
