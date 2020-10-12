const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.get(req.params.id);
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const changeBoardId = req.params.id;
  const updateBoard = {
    id: changeBoardId,
    title: req.body.title,
    columns: req.body.columns
  };

  boardService.update(changeBoardId, updateBoard);
  return res.json(Board.toResponse(updateBoard));
});

router.route('/:id').delete(async (req, res) => {
  const deleteBoard = await boardService.del(req.params.id);
  res.json(Board.toResponse(deleteBoard));
});

module.exports = router;
