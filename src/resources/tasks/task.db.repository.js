const Task = require('./task.model');

const getAll = async boardId => {
  const currentBoard = await Task.find({ boardId });

  if (!currentBoard) throw new Error('Error get tasks: tasks not found');
  return currentBoard;
};

const get = async (boardId, taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error(
      `Error get task: task by board id : ${boardId} and task id ${taskId} not found `
    );
  }
  return task;
};

const create = async task => {
  const newTask = await Task.create(task);
  if (!newTask) throw new Error('Error create: task not created');
  return await newTask;
};

const update = async (id, task) => {
  const updateTask = await Task.update({ _id: id }, task);
  if (!updateTask) throw new Error('Error ubdate task: task not update');
  return updateTask;
};

const del = async (boardId, taskId) => {
  const deleteTask = await (await Task.deleteOne({ _id: taskId })).deletedCount;
  if (!deleteTask) throw 'Error delete task: task not deleted';
  return deleteTask;
};

module.exports = { getAll, get, create, update, del };
