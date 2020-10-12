const boardRepo = require('./bord.memory.repository');

const getAll = () => boardRepo.getAll();

const create = board => boardRepo.create(board);

const get = id => boardRepo.get(id);

const update = (id, changeBoard) => boardRepo.update(id, changeBoard);

module.exports = { getAll, create, get, update };
