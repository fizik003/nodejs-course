// const { use } = require('chai');
// const Db = require('../../common/Db');
const DB = require('../../common/Db');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return DB.getAllUsers();
};
const get = async id => {
  const user = await DB.getUser(id);
  // if (!user) {
  //   throw new Error('user was not found');
  // }

  return user;
};

const update = async (id, user) => {
  const idArrayUser = await DB.updateUser(id, user);
  if (idArrayUser !== -1) return get(user.id);
  throw new Error('user was not found');
};

const create = async user => {
  DB.createUser(user);
  return get(user.id);
};

const del = async id => {
  const deleteUser = await DB.deleteUser(id);
  if (deleteUser === -1) throw new Error('this user was not found');
  return deleteUser;
};

module.exports = { getAll, get, create, update, del };
