const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasksByBoard = await taskService.getAll(req.params.boardId);
  if (tasksByBoard) {
    res.status(200).send(tasksByBoard.map(el => Task.toResponse(el)));
  } else res.status(404).end('not found');
});

router.route('/:taskId').get(async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.taskId);
  if (task) {
    res.status(200).send(Task.toResponse(task));
  } else res.status(404).end('not found');
});

router.route('/').post(async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  });
  const task = await taskService.create(newTask);
  if (task) {
    res.status(200).send(Task.toResponse(task));
  } else res.status(404).end('not found');
});

router.route('/:taskId').put(async (req, res) => {
  const changeTask = {
    id: req.params.taskId,
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  };

  const updateTask = await taskService.update(changeTask);
  if (updateTask) {
    res.status(200).send(updateTask);
  } else res.status(404).end('not found');
});

router.route('/:taskId').delete(async (req, res) => {
  const deleteTask = await taskService.del(
    req.params.boardId,
    req.params.taskId
  );
  if (deleteTask) {
    res.status(200).send(deleteTask);
  } else {
    res.status(404).end('not found');
  }
});

module.exports = router;
