const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { logger } = require('./loggerConf');

module.exports = (req, res, next) => {
  const openPath = ['/doc', '/login', '/'];
  if (openPath.includes(req.path)) return next();
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    logger.info('Wrong auth schema');
    res.status(401).end('Wrong auth schema');
  } else {
    const tokenString = req.header('Authorization');
    const [type, token] = tokenString.split(' ');
    if (type !== 'Bearer') {
      logger.info('Wrong auth schema');
      res.status(401).end('Wrong auth schema');
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (e) {
        logger.info('Unauthorized user');
        res.status(401).end('Unauthorized user');
        return;
      }
      return next();
    }
  }
};
