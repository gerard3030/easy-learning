const jwt = require("jsonwebtoken");

const generateToken = (payload, exp = "30d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: exp },
      (err, token) => {
        if (!err) {
          resolve(token);
        } else {
          reject(err);
        }
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (!err) {
        resolve(payload);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
