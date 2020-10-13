const DB = require('../../common/Db');

const getAll = async () => {
  return DB.getAllBoards();
};

const create = async board => {
  DB.createBoard(board);
  return get(board.id);
};

const get = async id => {
  const board = DB.getBoard(id);
  if (board) {
    return board;
  }
};

const update = async (id, changeBoard) => {
  const board = await DB.updateBoard(id, changeBoard);
  if (board) return changeBoard;
};

const del = async id => {
  const deleteBoard = await DB.deleteBoard(id);
  if (deleteBoard) return deleteBoard;
};

module.exports = { getAll, create, get, update, del };
