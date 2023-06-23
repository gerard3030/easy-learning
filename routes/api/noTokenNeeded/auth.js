const express = require("express");
const router = express.Router();

const usersModel = require("../../../model/users.model");
const authValidation = require("../../../validation/auth.validation");
const ResponseError = require("../../../module/ResponseError");
const bcrypt = require("../../../config/bcrypt");
const jwt = require("../../../config/jwt");

// create new user

router.post("/register", async (req, res) => {
  try {
    const dataFromUser = req.body;
    const validatedData = await authValidation.validateRegisterSchema(
      dataFromUser
    );
    const userEmail = await usersModel.findUserByEmail(validatedData.email);
    if (userEmail) {
      throw new ResponseError("db error: ", ["Email exists in DB"]);
    } else {
      if(validatedData.phone.length > 0) {
        const usrPhone = await usersModel.findUserByPhone(validatedData.phone);
      if (usrPhone) {
        throw new ResponseError("db error: ", ["phone exists in DB"]);
      }} 
      validatedData.password = await bcrypt.createHash(validatedData.password);
      const newUser = await usersModel.createNewUser(validatedData);
      res.json({
        msg: "user added to DB",
      });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// login to program

router.post("/login", async (req, res) => {
  try {
    const informationForUser = req.body;
    const validatedInfo = await authValidation.validateLoginSchema(
      informationForUser
    );
    const userDB = await usersModel.findUserByEmail(validatedInfo.email);
    if (!userDB) {
      throw new ResponseError("db error: ", [
        "Email do not exist in DB - try to register",
      ]);
    } else {
      if (userDB.accountSecurity.isBlocked === true) {
        throw new ResponseError("db error: ", [" Account is  Blocked!"]);
      }
      const userPassword = await bcrypt.compareHash(
        validatedInfo.password,
        userDB.password
      );
      if (!userPassword) {
        // check if block user needed.
        let currentTime = Date.now();
        let lastLoginAtp = userDB.accountSecurity.lastAttempt.getTime();
        let timeApproved = 10000;
        // let timeApproved = 86400000;
        const updated = await usersModel.updateUserAttempt(
          userDB.id,
          userDB.accountSecurity.failedAttempts
        );
        if (currentTime - lastLoginAtp > timeApproved) {
          if (userDB.accountSecurity.failedAttempts >= 2) {
            console.log("more than 3 times");
            await usersModel.blockAccount(userDB._id);
            throw new ResponseError("db error: ", ["user Blocked!"]);
          }
          throw new ResponseError("db error: ", ["password not correct"]);
        }
        throw new ResponseError("db error: ", ["password not correct"]);
      } else {
        const userToken = await jwt.generateToken({ id: userDB._id });
        res.json({
          msg: "we have token",
          userToken,
        });
      }
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// user forget password - before login

router.post("/forgotPass", async (req, res) => {
  try {
    const informationForUser = req.body;
    const dataValidation = await authValidation.validateResetPasswordSchema(
      informationForUser
    );
    const userFromDB = await usersModel.findUserByEmail(dataValidation.email);
    if (userFromDB) {
      if (userFromDB.phone == dataValidation.phone) {
        const hashedPass = await bcrypt.createHash(dataValidation.newPassword);
        await usersModel.updateUserPassword(userFromDB._id, hashedPass);
        res.json({
          msg: "password updated",
        });
      } else {
        throw new ResponseError("db error: ", ["phone number do not match"]);
      }
    } else {
      throw new ResponseError("db error: ", ["user not in DB"]);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
