const { PORT } = require('./common/config');
const { logger } = require('./common/loggerConf');
const app = require('./app');
const { MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', () => logger.error('db connection error'));
db.once('open', () => {
  logger.info('Successfully connect to DB');
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
  // db.dropDatabase();
});
