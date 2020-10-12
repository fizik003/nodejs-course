const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Column = require('../resources/boards/columns.model');

const DB = {
  users: [new User(), new User(), new User()],
  boards: [
    new Board({
      title: 'board1',
      columns: [
        new Column({ title: 'board-1-column-1', order: 0 }),
        new Column({ title: 'board-1-column-2', order: 0 })
      ]
    }),
    new Board({
      title: 'board2',
      columns: [
        new Column({ title: 'board-1-column-1', order: 0 }),
        new Column({ title: 'board-1-column-2', order: 0 })
      ]
    }),
    new Board({
      title: 'board3',
      columns: [
        new Column({ title: 'board-1-column-1', order: 0 }),
        new Column({ title: 'board-1-column-2', order: 0 })
      ]
    })
  ]
};

const getAllUsers = () => {
  return [...DB.users];
};

const getUser = id => {
  return DB.users.filter(el => id === el.id)[0];
};

const createUser = user => {
  DB.users.push(user);
};

const updateUser = (id, user) => {
  const currentUserIndex = DB.users.findIndex(el => el.id === id);
  if (currentUserIndex !== -1) {
    DB.users[currentUserIndex] = user;
  } else return currentUserIndex;
};

const deleteUser = id => {
  const currentUserIndex = DB.users.findIndex(el => el.id === id);
  if (currentUserIndex === -1) return currentUserIndex;
  const user = DB.users.splice(currentUserIndex, 1);
  return user[0];
};

const getAllBoards = () => {
  return [...DB.boards];
};

const createBoard = board => {
  DB.boards.push(board);
};

const getBoard = id => {
  return DB.boards.filter(el => id === el.id)[0];
};

const updateBoard = (id, changeBoard) => {
  const currentBoardIndex = DB.boards.findIndex(el => el.id === id);
  if (currentBoardIndex !== -1) {
    DB.boards[currentBoardIndex] = changeBoard;
  }
  return currentBoardIndex;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  createBoard,
  getBoard,
  updateBoard
};
