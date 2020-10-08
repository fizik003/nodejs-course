const DB = require('../../common/Db');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return DB.getAllUsers();
};
const get = async id => DB.getUser(id);

const create = async user => {
  DB.push(user);
  return get(user.id);
};

module.exports = { getAll, get, create };
