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
  if (!board) {
    throw new Error('board was not found');
  }
  return board;
};

const update = async (id, changeBoard) => {
  const idBoardInDB = await DB.updateBoard(id, changeBoard);
  if (idBoardInDB !== -1) return get(changeBoard.id);
  throw new Error('board was not found');
};

const del = async id => {
  const deleteBoard = await DB.deleteBoard(id);
  if (deleteBoard === -1) throw new Error('this user was not found');
  return deleteBoard;
};

module.exports = { getAll, create, get, update, del };
