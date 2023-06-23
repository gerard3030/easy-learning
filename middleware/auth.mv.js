const jwt = require("../config/jwt");


module.exports = async (req, res, next) => {
  try {
    const payload = await jwt.verifyToken(req.headers["token"]);
 
    req.passId = payload.id;
    
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

