const { getByProps } = require('../users/user.db.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const signToken = async (login, password) => {
  const user = await getByProps({ login, password });
  if (!user) {
    return null;
  }
  const { id, login: userLogin } = user;
  const token = jwt.sign({ id, login: userLogin }, JWT_SECRET_KEY);
  return token;
};

module.exports = { signToken };
