// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const albumsRouter = require('./controllers/album.js');
exports.init = app => {
  app.get('/health', healthCheck);
  app.use('/albums', albumsRouter);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
