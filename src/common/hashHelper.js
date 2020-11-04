const bcrypt = require('bcrypt');

const generateHashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const checkHashPassword = async (passward, hash) => {
  return await bcrypt.compare(passward, hash);
};

module.exports = { generateHashPassword, checkHashPassword };
