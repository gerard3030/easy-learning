const jwt = require("../config/jwt");
const userMod = require("../model/users.model");
const ResponseError = require("../module/ResponseError");

module.exports = async (req, res, next) => {
  try {
    const payload = await jwt.verifyToken(req.headers["token"]);
    req.passId = payload.id;
    const userFromDB = await userMod.findByID(req.passId);
    if (userFromDB.isAdmin === false) {
      throw new ResponseError("Hacking error", ["user is not an admin"]);
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
