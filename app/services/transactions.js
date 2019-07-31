const errors = require('../errors');
const AlbumsTransactions = require('../models').albumsTransactions;
const User = require('../models').users;

exports.buyAlbum = async (userEmail, album) => {
  const albumId = album.id;
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      throw errors.badRequest('User not found');
    }
    const transaction = await AlbumsTransactions.findOne({ where: { userId: user.id, albumId } });
    if (transaction) {
      throw errors.badRequest('The transaction was already made');
    }
    const result = await AlbumsTransactions.create({
      userId: user.id,
      albumId
    });
    return result;
  } catch (e) {
    if (!e.internalCode) {
      throw errors.defaultError(e.message);
    }
    throw e;
  }
};
