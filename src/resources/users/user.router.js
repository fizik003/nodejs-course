const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    res.status(404).end('not found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    console.log('111111111111111');
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    res.status(404).end('not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(
      new User({
        login: req.body.login,
        name: req.body.name,
        password: req.body.password
      })
    );
    res.status(200).send(User.toResponse(user));
  } catch (err) {
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
    usersService.update(idUser, updateUser);
    return res.status(200).send(User.toResponse(updateUser));
  } catch (err) {
    res.status(404).end('not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const deleteUser = await usersService.del(req.params.id);
    res.status(200).send(User.toResponse(deleteUser));
  } catch (err) {
    res.status(404).end('not found');
  }
});

module.exports = router;
