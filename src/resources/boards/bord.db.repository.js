const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  const boards = await Board.find({});
  if (!boards) throw new Error('boards not found');
  return boards;
};

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new Error(`Error get board by id: board with id: ${id} not found`);
  }

  return board;
};

const create = async board => {
  const newBoard = await Board.create(board);
  if (!newBoard) throw new Error('board not created');
  return newBoard;
};

const update = async (id, changeBoard) => {
  const board = await Board.update({ _id: id }, changeBoard);
  if (!board) throw new Error(`Error update: board with id: ${id} not update`);
  return board;
};

const del = async id => {
  await (await Task.deleteMany({ boardId: id })).deletedCount;
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, create, get, update, del };
