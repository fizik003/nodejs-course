const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = (boardId, taskId) => taskRepo.get(boardId, taskId);

const create = task => taskRepo.create(task);

const update = task => taskRepo.update(task);

const del = (boardId, taskId) => taskRepo.del(boardId, taskId);

module.exports = { getAll, get, create, update, del };
