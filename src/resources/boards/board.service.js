const boardRepo = require('./bord.db.repository');

const getAll = () => boardRepo.getAll();

const create = board => boardRepo.create(board);

const get = id => boardRepo.get(id);

const update = (id, changeBoard) => boardRepo.update(id, changeBoard);

const del = id => boardRepo.del(id);

module.exports = { getAll, create, get, update, del };
