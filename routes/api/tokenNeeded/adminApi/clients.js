const express = require("express");
const router = express.Router();

const usersModel = require("../../../../model/users.model");
const authValidation = require("../../../../validation/auth.validation");
const ResponseError = require("../../../../module/ResponseError");
const bcrypt = require("../../../../config/bcrypt");

// unblock user

router.patch("/unblock", async (req, res) => {
  try {
    const dataFromUser = req.body;
    const validatedUserInfo = await authValidation.validateUnblockSchema(
      dataFromUser
    );
    const userInfoFromDB = await usersModel.findUserByEmail(
      validatedUserInfo.email
    );
    if (userInfoFromDB && userInfoFromDB.isAdmin === true) {
      const userToUnblock = await usersModel.findUserByEmail(
        validatedUserInfo.userUnblockEmail
      );
      if (userToUnblock) {
        await usersModel.unBlockAccount(userToUnblock._id);
        res.json({
          msg: "user unblocked",
        });
      } else {
        throw new ResponseError("no data: ", ["user to unlock cant be found"]);
      }
    } else {
      throw new ResponseError("Authentication Error: ", ["not an admin"]);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// get user info

router.get("/getInfoEmail/:email", async (req, res) => {
  try {
    const userData = req.params.email;
    const validateUserData = await authValidation.validateDeleteUserSchema({
      email: userData,
    });
    if (!validateUserData) {
      throw new ResponseError("data error: ", ["data Invalid"]);
    } else {
      const userFromDB = await usersModel.findUserByEmail(
        validateUserData.email
      );
      if (!userFromDB) {
        throw new ResponseError("data error: ", ["Email not exists in DB"]);
      } else {
        const { firstName, lastName, email, phone, address, isAdmin, id , userIMG, isVip} =
          userFromDB;
        res.json({
          msg: "we have data",
          name: firstName,
          lastName: lastName,
          email,
          address,
          phone,
          isAdmin,
          id,
          userIMG, 
          isVip
        
        });
      }
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// delete user

router.delete("/deleteUserByEmail/:email", async (req, res) => {
  try {
    const userData = req.params.email;
    const validateUserData = await authValidation.validateDeleteUserSchema({
      email: userData,
    });
    if (!validateUserData) {
      throw new ResponseError("data error: ", ["data Invalid"]);
    } else {
      const userFromDB = await usersModel.findUserByEmail(
        validateUserData.email
      );
      if (!userFromDB) {
        throw new ResponseError("data error: ", ["Email not exists in DB"]);
      } else {
        const userIdToDelete = userFromDB.id;
        const deleteUser = await usersModel.deleteUser(userIdToDelete);
        res.json({
          msg: "User Deleted",
        });
      }
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// add admin

router.post("/registerAdmin", async (req, res) => {
  try {
    const dataFromUser = req.body;
    const validatedData = await authValidation.validateRegisterAdminSchema(
      dataFromUser
    );
    const userEmail = await usersModel.findUserByEmail(validatedData.email);
    if (userEmail) {
      throw new ResponseError("db error: ", ["Email exists in DB"]);
    } else {
      if (validatedData.phone.length > 0) {
        const usrPhone = await usersModel.findUserByPhone(validatedData.phone);
        if (usrPhone) {
          throw new ResponseError("db error: ", ["phone exists in DB"]);
        }
      }
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

module.exports = router;
