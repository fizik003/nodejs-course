const { generateHashPassword } = require('../../common/hashHelper');
const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = async user => {
  const { password } = user;
  const hashPassword = await generateHashPassword(password);
  return usersRepo.create({ ...user, password: hashPassword });
};

const update = (id, user) => usersRepo.update(id, user);

const del = id => usersRepo.del(id);

module.exports = { getAll, get, create, update, del };
