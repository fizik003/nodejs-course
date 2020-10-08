const User = require('../resources/users/user.model');

const DB = [new User(), new User(), new User()];

const getAllUsers = () => {
  return [...DB];
};

const getUser = id => {
  return DB.filter(el => id === el.id)[0];
};

module.exports = { DB, getAllUsers, getUser };
