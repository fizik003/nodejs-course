const User = require('../resources/users/user.model');

const DB = { users: [new User(), new User(), new User()] };

const getAllUsers = () => {
  return [...DB.users];
};

const getUser = id => {
  return DB.users.filter(el => id === el.id)[0];
};

const createUser = user => {
  DB.users.push(user);
};

const updateUser = (id, user) => {
  const currentUserIndex = DB.users.findIndex(el => el.id === id);
  if (currentUserIndex !== -1) {
    DB.users[currentUserIndex] = user;
  } else return currentUserIndex;
};

const deleteUser = id => {
  const currentUserIndex = DB.users.findIndex(el => el.id === id);
  if (currentUserIndex === -1) return currentUserIndex;
  const user = DB.users.splice(currentUserIndex, 1);
  return user[0];
};

module.exports = {
  DB,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
