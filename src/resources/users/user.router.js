const router = require('express').Router();
const User = require('./user.model');
const { logger } = require('../../common/loggerConf');
const { create, getAll, get, update, del } = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await get(req.params.id);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newUser = {
      login: req.body.login,
      name: req.body.name,
      password: req.body.password
    };
    const user = await create(newUser);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const idUser = req.params.id;
    const updateUser = {
      id: idUser,
      login: req.body.login,
      name: req.body.name,
      password: req.body.password
    };
    await update(idUser, updateUser);
    return res.status(200).send(User.toResponse(updateUser));
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await del(req.params.id);
    res.status(200).send('OK');
  } catch (err) {
    logger.error(err.stack);
    res.status(404).end('not found');
  }
});

module.exports = router;
