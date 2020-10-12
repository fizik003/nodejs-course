const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  // map user fields to exclude secret fields like "password"
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      name: req.body.name,
      password: req.body.password
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const idUser = req.params.id;
  const updateUser = {
    id: idUser,
    login: req.body.login,
    name: req.body.name,
    password: req.body.password
  };
  usersService.update(idUser, updateUser);
  return res.json(User.toResponse(updateUser));
});

router.route('/:id').delete(async (req, res) => {
  const deleteUser = await usersService.del(req.params.id);
  res.json(User.toResponse(deleteUser));
});

module.exports = router;
