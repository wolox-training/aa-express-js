const { check } = require('express-validator');

const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/album.js');
const userController = require('./controllers/users');
const userMiddle = require('./middlewares/user');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albumsController.getAlbums);
  app.get('/albums/:id/photos', albumsController.getPhotoOfAlbum);
  app.post(
    '/users',
    [
      check('firstName').custom(userMiddle.checkAttributeMissing),
      check('lastName').custom(userMiddle.checkAttributeMissing),
      check('email')
        .custom(userMiddle.checkAttributeMissing)
        .isEmail()
        .withMessage('Not valid email')
        .contains('@wolox.com.ar')
        .withMessage('Not wolox email'),
      check('password')
        .custom(userMiddle.checkAttributeMissing)
        .isAlphanumeric()
        .withMessage('Not alphanumeric password')
        .isLength({ min: 8 })
        .withMessage('Not long enough password')
    ],
    userController.addUser
  );
  app.post(
    '/users/sessions',
    [
      check('email')
        .custom(userMiddle.checkAttributeMissing)
        .isEmail()
        .withMessage('Not valid email')
        .contains('@wolox.com.ar')
        .withMessage('Not wolox email'),
      check('password')
        .custom(userMiddle.checkAttributeMissing)
        .isAlphanumeric()
        .withMessage('Not alphanumeric password')
        .isLength({ min: 8 })
        .withMessage('Not long enough password')
    ],
    userController.loginUser
  );
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
