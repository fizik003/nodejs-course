const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  if (boards) {
    res.status(200).send(boards.map(el => Board.toResponse(el)));
  } else res.status(404).end('not found');
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
  const board = await boardService.get(req.params.id);
  if (board) {
    res.status(200).send(Board.toResponse(board));
  } else res.status(404).end('not found');
});

router.route('/:id').put(async (req, res) => {
  const changeBoardId = req.params.id;
  const updateBoard = {
    id: changeBoardId,
    title: req.body.title,
    columns: req.body.columns
  };

  const board = boardService.update(changeBoardId, updateBoard);
  if (board) {
    res.status(200).send(Board.toResponse(board));
  } else res.status(404).end('not found');
});

router.route('/:id').delete(async (req, res) => {
  const deleteBoard = await boardService.del(req.params.id);
  if (deleteBoard) {
    res.status(200).send(deleteBoard);
  } else res.status(404).end('not found');
});

module.exports = router;
