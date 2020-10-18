const morgan = require('morgan');
const winston = require('winston');

morgan.token('host', req => req.headers.host + req.url);
morgan.token('query', req => JSON.stringify(req.query));
morgan.token('body', req => JSON.stringify(req.body));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.simple()),

  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      format: winston.format.combine(winston.format.json())
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    }),
    new winston.transports.Console()
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = { logger, morgan };
