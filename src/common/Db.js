const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Column = require('../resources/boards/columns.model');
const Task = require('../resources/tasks/task.model');

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

const taskDB = [
  new Task({
    title: 'board-0',
    order: 0,
    description: 'board-0-task-description',
    userId: DB.users[0].id,
    boardId: DB.boards[0].id,
    columnId: DB.boards[0].columns[0].id
  }),
  new Task({
    title: 'board-0',
    order: 0,
    description: 'board-0-task-description',
    userId: DB.users[1].id,
    boardId: DB.boards[0].id,
    columnId: DB.boards[0].columns[0].id
  })
];

const getAllUsers = () => {
  return [...DB.users];
};

const getUser = id => {
  return DB.users.filter(el => id === el.id)[0];
};

const createUser = user => {
  DB.users.push(user);
  return user;
};

const updateUser = (id, user) => {
  const currentUserIndex = DB.users.findIndex(el => el.id === id);
  if (currentUserIndex + 1) {
    DB.users[currentUserIndex] = user;
    return user;
  }
};

const deleteUser = id => {
  const currentUserIndex = DB.users.findIndex(el => el.id === id);
  if (currentUserIndex + 1) {
    taskDB.forEach(el => {
      if (el.userId === id) el.userId = null;
    });
    const user = DB.users.splice(currentUserIndex, 1);
    return user[0];
  }
};

const getAllBoards = () => {
  return [...DB.boards];
};

const createBoard = board => {
  DB.boards.push(board);
  return board;
};

const getBoard = id => {
  return DB.boards.filter(el => id === el.id)[0];
};

const updateBoard = (id, changeBoard) => {
  const currentBoardIndex = DB.boards.findIndex(el => el.id === id);
  if (currentBoardIndex + 1) {
    DB.boards[currentBoardIndex] = changeBoard;
    return changeBoard;
  }
};

const deleteBoard = async id => {
  const currentBoardIndex = DB.boards.findIndex(el => el.id === id);
  if (currentBoardIndex + 1) {
    const board = DB.boards.splice(currentBoardIndex, 1);
    while (taskDB.findIndex(el => el.boardId === id) + 1) {
      const index = taskDB.findIndex(el => el.boardId === id);
      deleteTask(id, taskDB[index].id);
    }

    return board[0];
  }
};

const getAllTask = async boardId => {
  return taskDB.filter(el => (el.boardId = boardId));
};

const createTask = task => {
  taskDB.push(task);
};

const updateTask = async task => {
  const idTaskinArray = taskDB.findIndex(el => el.id === task.id);
  if (idTaskinArray + 1) {
    taskDB[idTaskinArray] = task;
    return task;
  }
};

const deleteTask = async (boardId, taskId) => {
  const idTaskinArray = taskDB.findIndex(el => {
    return el.id === taskId && el.boardId === boardId;
  });
  if (idTaskinArray + 1) {
    const task = taskDB.splice(idTaskinArray, 1);
    return task;
  }
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
  updateBoard,
  deleteBoard,
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  taskDB
};
