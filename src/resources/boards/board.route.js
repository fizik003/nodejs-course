const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();

    res.status(200).send(boards.map(el => Board.toResponse(el)));
  } catch (err) {
    res.status(404).end('not found');
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  if (board) {
    res.status(200).send(Board.toResponse(board));
  } else res.status(404).end('not found');
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    res.status(200).send(Board.toResponse(board));
  } catch (e) {
    res.status(404).end('not found');
  }
});

router.route('/:id').put(async (req, res) => {
  const changeBoardId = req.params.id;
  const updateBoard = {
    id: changeBoardId,
    title: req.body.title,
    columns: req.body.columns
  };

  try {
    const board = boardService.update(changeBoardId, updateBoard);

    res.status(200).send(Board.toResponse(board));
  } catch (err) {
    res.status(404).end('not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const deleteBoard = await boardService.del(req.params.id);

    res.status(200).send(deleteBoard);
  } catch (err) {
    res.status(404).end('not found');
  }
});

module.exports = router;
