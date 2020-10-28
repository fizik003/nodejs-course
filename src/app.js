const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.route');
const taskRouter = require('./resources/tasks/task.route');
const { logger, morgan } = require('./common/loggerConf');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process.on('uncaughtException', err => {
  console.error(`captured error: ${err.stack}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

app.use(
  morgan(
    ' [:date[clf]] :method :status :host Query :query Body :body  :response-time ms',
    {
      stream: logger.stream
    }
  )
);

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks', taskRouter);

app.use((err, req, res) => {
  if (err) {
    logger.error(err.stack);
    res.status(500).send('Internal server error');
    // next(err);
  }
});

// for crosscheck
// Promise.reject(Error('Oops!'));
// throw Error('Oops!');

module.exports = app;
