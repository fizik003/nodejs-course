const DB = require('../../common/Db');
const boardService = require('../boards/board.service');

const getAll = async boardId => {
  const currentBoard = await boardService.get(boardId);
  if (currentBoard) {
    const tasksbyBoardId = await DB.getAllTask(currentBoard.id);
    return tasksbyBoardId;
  }

  if (!currentBoard) throw new Error('Error get tasks: tasks not found');
};

const get = async (boardId, taskId) => {
  const tasksOnBoard = await getAll(boardId);
  if (!tasksOnBoard) {
    throw new Error(
      `Error get task: task by board id : ${boardId} and task id ${taskId} not found `
    );
  }
  const task = tasksOnBoard.find(el => el.id === taskId);
  if (task) {
    return task;
  }

  if (!task) {
    throw new Error(
      `Error get task: task by board id : ${boardId} and task id ${taskId} not found `
    );
  }
};

const create = async task => {
  const newTask = await DB.createTask(task);
  if (newTask) return await get(newTask.boardId, newTask.id);
  if (!newTask) throw new Error('Error create: task not created');
};

const update = async task => {
  const updateTask = await DB.updateTask(task);
  if (updateTask) {
    return updateTask;
  }
  if (!updateTask) throw new Error('Error ubdate task: task not update');
};

const del = async (boardId, taskId) => {
  const deleteTask = await DB.deleteTask(boardId, taskId);
  if (deleteTask) {
    return deleteTask;
  }
  if (!deleteTask) throw new Error('Error delete task: task not deleted');
};

module.exports = { getAll, get, create, update, del };
