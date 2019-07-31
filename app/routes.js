const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/album.js');
const userController = require('./controllers/users');
const adminController = require('./controllers/admin');
const userMiddle = require('./middlewares/user');
const securityMiddle = require('./middlewares/security');
exports.init = app => {
  app.get('/health', healthCheck);
  // Obtener info de un album
  app.get('/albums', albumsController.getAlbums);
  // Comprar un album
  app.post('/albums/:id', [securityMiddle.checkToken], albumsController.buyAlbum);
  // Obtener fotos de un album
  app.get('/albums/:id/photos', albumsController.getPhotoOfAlbum);
  // Listar albums comprados
  app.get('/users/:id/albums', [securityMiddle.checkToken], userController.getAlbumsOfUser);
  // Obtener photos de un album comprado
  app.get('/users/albums/:id/photos', [securityMiddle.checkToken], userController.getPhotosOfAlbum);
  // Invalidar todas las sesiones
  app.post('/users/sessions/invalidate_all', userController.invalidateAllTokens);
  // Crear un usuario admin
  app.post(
    '/admin/users',
    [userMiddle.createUser, securityMiddle.checkToken, securityMiddle.isAdmin],
    adminController.addAdminUser
  );
  // Obtener usuarios
  app.get('/users', [userMiddle.listUsers, securityMiddle.checkToken], userController.getUsers);
  // Crear usuario
  app.post('/users', userMiddle.createUser, userController.addUser);
  // Loguearse
  app.post('/users/sessions', userMiddle.loginUser, userController.loginUser);
};
