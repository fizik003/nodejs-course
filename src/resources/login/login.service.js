const { getByProps } = require('../users/user.db.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkHashPassword } = require('../../common/hashHelper');
const signToken = async (login, password) => {
  const user = await getByProps({ login });
  if (!user) {
    return null;
  }
  const { password: hashPassword } = user;
  const comparisonRes = await checkHashPassword(password, hashPassword);
  if (!comparisonRes) return null;
  const { id, login: userLogin } = user;
  const token = jwt.sign({ id, login: userLogin }, JWT_SECRET_KEY);
  return token;
};

module.exports = { signToken };
