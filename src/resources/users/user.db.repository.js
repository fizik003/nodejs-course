const User = require('../users/user.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  const users = await User.find({}).exec();
  if (!users) throw new Error('users not found');
  return users;
};
const get = async id => {
  const user = await User.findById(id);
  if (!user) throw new Error('Error get user by id, id not found');
  return user;
};

const update = async (id, user) => {
  const newUser = await User.updateOne({ _id: id }, user);
  if (!newUser) {
    throw new Error(`Error update user, user with id ${id} not found`);
  }
  return newUser;
};

const create = async user => {
  const newUser = await User.create(user);
  if (!newUser) throw new Error('Error create user');
  return newUser;
};

const del = async id => {
  await Task.updateMany({ userId: id }, { userId: null });
  const deletId = (await User.deleteOne({ _id: id })).deletedCount;
  if (!deletId) {
    throw new Error(`Error delete user, user with id:${id} not found`);
  }
  return deletId;
};

module.exports = { getAll, get, create, update, del };
