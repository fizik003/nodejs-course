const DB = require('../../common/Db');
const boardService = require('../boards/board.service');

const getAll = async boardId => {
  const currentBoard = await boardService.get(boardId);
  if (currentBoard) {
    const tasksbyBoardId = DB.getAllTask(currentBoard.id);
    return tasksbyBoardId;
  }
};

const get = async (boardId, taskId) => {
  const tasksOnBoard = await getAll(boardId);
  if (tasksOnBoard) {
    const task = tasksOnBoard.filter(el => el.id === taskId)[0];
    return task;
  }
};

const create = async task => {
  DB.createTask(task);
  getAll(task.boardId);
  return get(task.boardId, task.id);
};

const update = async task => {
  const updateTaskid = await DB.updateTask(task);
  if (updateTaskid) {
    return updateTaskid;
  }
};

const del = async (boardId, taskId) => {
  const deleteTask = await DB.deleteTask(boardId, taskId);
  if (deleteTask) {
    return deleteTask;
  }
};

module.exports = { getAll, get, create, update, del };
