const morgan = require('morgan');
const winston = require('winston');

morgan.token('host', req => req.headers.host + req.url);
morgan.token('query', req => JSON.stringify(req.query));
morgan.token('body', req => {
  let body = req.body;
  if (body.password) {
    body = { ...body, password: '*'.repeat(body.password.length) };
  }
  return JSON.stringify(body);
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
      ),
      level: 'info',
      handleExceptions: true
    }),

    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.timestamp()
      ),
      handleExceptions: true
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.uncolorize()
      ),
      handleExceptions: true
    })
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = { logger, morgan };
