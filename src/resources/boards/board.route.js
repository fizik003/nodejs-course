const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const { logger } = require('../../common/loggerConf');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();

    res.status(200).send(boards.map(Board.toResponse));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newBoard = new Board({
      title: req.body.title,
      columns: req.body.columns
    });
    const board = await boardService.create(newBoard);
    res.status(200).send(Board.toResponse(board));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    res.status(200).send(Board.toResponse(board));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

router.route('/:id').put(async (req, res) => {
  const changeBoardId = req.params.id;
  const updateBoard = {
    title: req.body.title,
    columns: req.body.columns
  };

  try {
    const board = boardService.update(changeBoardId, updateBoard);

    res.status(200).send(Board.toResponse(board));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardService.del(req.params.id);
    res.status(200).send('OK');
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

module.exports = router;
