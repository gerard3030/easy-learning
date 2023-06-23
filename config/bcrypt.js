const bcrypt = require("bcryptjs");

const createHash = (password) => bcrypt.hash(password, 10);

const compareHash = (password, passwordHash) =>
  bcrypt.compare(password, passwordHash);

module.exports = {
  createHash,
  compareHash,
};
