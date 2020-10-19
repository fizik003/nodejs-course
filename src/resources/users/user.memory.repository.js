// const { use } = require('chai');
// const Db = require('../../common/Db');
const DB = require('../../common/Db');

const getAll = async () => {
  const users = await DB.getAllUsers();
  if (!users) throw new Error('Eror get users');
  return users;
};
const get = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error('user was not found');
  }

  return user;
};

const update = async (id, user) => {
  await DB.updateUser(id, user);
  if (!user) throw new Error(`Error update user: user with id ${id} not found`);
  return get(user.id);
};

const create = async user => {
  const newUser = DB.createUser(user);
  if (!newUser) throw new Error('Error create: user not created');
  return get(user.id);
};

const del = async id => {
  const deleteUser = await DB.deleteUser(id);
  if (!deleteUser) {
    throw new Error(`Error delete user:  user with id ${id} not found`);
  }
  return deleteUser;
};

module.exports = { getAll, get, create, update, del };
