const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const { logger } = require('../../common/loggerConf');

router.route('/').get(async (req, res) => {
  try {
    const tasksByBoard = await taskService.getAll(req.params.boardId);
    res.status(200).send(tasksByBoard.map(el => Task.toResponse(el)));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end(err.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await taskService.get(req.params.boardId, req.params.taskId);
    res.status(200).send(Task.toResponse(task));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end(err.message);
  }
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
  try {
    const task = await taskService.create(newTask);

    res.status(200).send(Task.toResponse(task));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end(err.message);
  }
});

router.route('/:taskId').put(async (req, res) => {
  const changeTask = {
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  };
  const taskId = req.params.taskId;

  try {
    const updateTask = await taskService.update(taskId, changeTask);
    res.status(200).send(Task.toResponse(updateTask));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end(err.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    await taskService.del(req.params.boardId, req.params.taskId);

    res.status(200).send('OK');
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end(err.message);
  }
});

module.exports = router;
