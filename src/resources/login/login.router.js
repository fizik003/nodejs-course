const router = require('express').Router();
const loginService = require('./login.service');
const { logger } = require('../../common/loggerConf');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const token = await loginService.signToken(login, password);
  if (!token) {
    logger.error('user not found');
    res.status(403).end('wrong login/password');
  } else {
    res.status(200).json(token);
  }
});

module.exports = router;
