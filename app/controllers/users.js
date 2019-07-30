const usersService = require('../services/user');
const albumsService = require('../services/album');
const log = require('../logger');

exports.addUser = (req, res, next) =>
  usersService
    .createUser(req.body)
    .then(result => {
      log.info(`User created first name: ${result.firstName}, last name: ${result.lastName}`);
      return result;
    })
    .then(() => res.status(201).end())
    .catch(err => {
      log.error(err.message);
      return next(err);
    });

exports.loginUser = (req, res, next) =>
  usersService
    .loginUser(req.body)
    .then(token =>
      res
        .json({ token })
        .status(201)
        .end()
    )
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
exports.getUsers = (req, res, next) =>
  usersService
    .getUsers(req.query)
    .then(users => res.status(200).send(users))
    .catch(err => {
      log.error(err.message);
      return next(err);
    });
exports.getAlbumsOfUser = (req, res, next) => {
  const userId = req.params.id;
  return usersService
    .getAlbumsOfUser(req.decode.email, userId, req.decode.admin, albumsService.getAlbum)
    .then(albums => {
      res.status(200).send(albums);
    })
    .catch(err => {
      log.error(err.message);
      next(err);
    });
};
