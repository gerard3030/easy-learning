const express = require("express");
const router = express.Router();

const usersModel = require("../../../../model/users.model");
const courseModel = require("../../../../model/courses.model");
const authValidation = require("../../../../validation/auth.validation");
const ResponseError = require("../../../../module/ResponseError");
const bcrypt = require("../../../../config/bcrypt");
const jwt = require("../../../../config/jwt");
const wishListModel = require("../../../../model/wish.model");

// user or admin change user password
router.patch("/reset", async (req, res) => {
  try {
    const userID = req.passId;
    const informationForUser = req.body;
    const verifyData = await authValidation.validateResetPasswordSchemaNew(
      informationForUser
    );
    if (!verifyData) {
      throw new ResponseError("db error: ", ["data Invalid"]);
    }
    const findUserFromDB = await usersModel.findUserByEmail(verifyData.email);
    const isUserAdmin = await usersModel.findByID(userID);
    // check if user is account owner or admin

    if (findUserFromDB._id == userID || isUserAdmin.isAdmin === true) {
      const hashedPass = await bcrypt.createHash(verifyData.newPassword);
      const resetPassword = await usersModel.updateUserPassword(
        findUserFromDB._id,
        hashedPass
      );
    } else {
      throw new ResponseError("db error: ", [
        "only admin or account owner can update",
      ]);
    }
    res.json({
      msg: "password updated",
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// get user information
router.get("/getUserInfo", async (req, res) => {
  try {
    const userFromDB = await usersModel.findByID(req.passId);
    if (!userFromDB) {
      throw new ResponseError("db error: ", ["User can't be found"]);
    } else {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        isAdmin,
        id,
        isVip = null,
        userIMG,
      } = userFromDB;
      res.json({
        msg: "we have data",
        name: firstName,
        lastName: lastName,
        email,
        address,
        phone,
        isAdmin,
        id,
        isVip,
        userIMG,
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// edit user data for users

router.put("/editUser", async (req, res) => {
  const userData = req.body;
  const userIdByToken = req.passId;
  let originalEmail = userData.userEmail;
  let newEmail = userData.newEmail;
  try {
    const validateUserData = await authValidation.validateEditUserSchema(
      userData
    );
    if (!validateUserData) {
      throw new ResponseError("db error: ", ["data invalid"]);
    } else {
      const userInfoByToken = await usersModel.findByID(userIdByToken);
      const reqUserInformation = await usersModel.findUserByEmail(
        originalEmail
      );
      let userID = reqUserInformation.id;
      let userPhone = await usersModel.findUserByPhone(userData.phone);

      if (userPhone) {
        // check if req done by Admin

        if (userInfoByToken.isAdmin == true) {
          if (
            userData.userEmail != userPhone.email ||
            userData.newEmail != userPhone.email
          ) {
            throw new ResponseError("db error: ", [
              "phone used in a different account",
            ]);
          }
        } else {
          if (userPhone.email != userData.userEmail) {
            throw new ResponseError("db error: ", [
              "phone used in a different account here2",
            ]);
          }
        }
      }

      let arrangedData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: newEmail,
        phone: userData.phone,
        address: {
          country: userData.address.country,
          city: userData.address.city,
          street: userData.address.street,
          houseNumber: userData.address.houseNumber,
          zip: userData.address.zip,
        },
        isVip: userData.isVip,
        userIMG: userData.userIMG,
      };
      const updateUserInfo = await usersModel.updateUserData(
        userID,
        arrangedData
      );
    }
    res.json({
      msg: "User Data Updated",
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// delete user from users

router.delete("/deleteUserByEmail/:email", async (req, res) => {
  try {
    const userData = req.params.email;
    const userIdByToken = req.passId;
    const validateUserData = await authValidation.validateDeleteUserSchema({
      email: userData,
    });
    if (!validateUserData) {
      throw new ResponseError("data error: ", ["user Not in DB "]);
    } else {
      // check if account owner or admin
      const userTokenEmail = await usersModel.findByID(userIdByToken);
      if (userTokenEmail.email != userData) {
        throw new ResponseError("data error: ", ["unauthorized action "]);
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
            msg: "User Deleted, Hope to see you soon!",
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// wishlist  - testing

// router.get("/showUserList", async (req,res)=>{
//   try {
//     const {userID} = req.query
//     const userList = await wishListModel.showUserList(userID);
//     if (!userList) {
//       throw new ResponseError("data error: ", ["user don't have a list yet"]);
//     } else {
//       const courseIdFromList = userList.allCoursesInList;
//       const fullCorseInfo = await courseModel.findCoursesFromArr(courseIdFromList)
//       res.json(fullCorseInfo)
//     }
//   }catch(error){
//     res.status(400).json({ error });
//   }
// })

// need to add remove from list

// testing
router.get("/freeCourse", async (req, res) => {
  try {
    const { userID } = req.query;
    const showCourse = await courseModel.showRadonCourse();
    res.json(showCourse);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
