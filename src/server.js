const { PORT } = require('./common/config');
const { logger } = require('./common/loggerConf');
const app = require('./app');
const { MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');
const User = require('./resources/users/user.model');

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
  db.dropDatabase();
  User.create({
    login: 'admin',
    name: 'admin',
    password: '$2b$10$y6cFp4oRg4brkaLBxCz77OoDwit1tRCp1i4Mnb1l9ry4DBFyl6nMy'
  });
});
