const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const del = id => usersRepo.del(id);

module.exports = { getAll, get, create, update, del };
