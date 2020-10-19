const DB = require('../../common/Db');

const getAll = async () => {
  const boards = DB.getAllBoards();
  if (boards) return boards;
  if (!boards) throw new Error('boards not found');
};

const get = async id => {
  const board = await DB.getBoard(id);
  if (board) return board;
  if (!board) {
    throw new Error(`Error get board by id: board with id: ${id} not found`);
  }
};

const create = async board => {
  const newBoard = await DB.createBoard(board);
  if (newBoard) return newBoard;
  //  get(board.id);
  if (!newBoard) throw new Error('board not created');
};

const update = async (id, changeBoard) => {
  const board = await DB.updateBoard(id, changeBoard);
  if (board) return changeBoard;
  if (!board) throw new Error(`Error update: board with id: ${id} not update`);
};

const del = async id => {
  const deleteBoard = await DB.deleteBoard(id);
  if (deleteBoard) return deleteBoard;
  if (!deleteBoard) {
    throw new Error(` Error delete: board with id: ${id} not found`);
  }
};

module.exports = { getAll, create, get, update, del };
