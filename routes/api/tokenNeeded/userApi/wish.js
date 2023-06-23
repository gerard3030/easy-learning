const express = require("express");
const router = express.Router();
const wishModule = require("../../../../model/wish.model");
const wishValidation = require("../../../../validation/wish.validation");
const courseModel = require("../../../../model/courses.model");
const ResponseError = require("../../../../module/ResponseError");

// create or add to wishlist

router.post("/wish", async (req, res) => {
  try {
    const userID = req.passId;
    const verifyUserData = req.body;
    const validateUserInfo = await wishValidation.wishListSchemaValidation(
      verifyUserData
    );
    if (!validateUserInfo) {
      throw new ResponseError("data error: ", "", ["enter correct data"]);
    } else {
      const courseAvailable = await courseModel.findCourseByID(
        validateUserInfo.productID
      );
      if (!courseAvailable) {
        throw new ResponseError("data error: ", " ", [
          "we don't have this course ",
        ]);
      } else {
        const userHasList = await wishModule.checkForUserList(userID);
        if (userHasList.length <= 0) {
          const createNewList = await wishModule.createNewList(
            validateUserInfo,
            userID
          );
          res.json({
            msg: `your first wishlist has been created! 
            course ${courseAvailable.courseName} has been added`,
          });
        } else {
          const currentList = userHasList[0];
          let previousItems = currentList.allCoursesInList;
          const additionalCourse = courseAvailable._id;
          const allCourses = [...previousItems, additionalCourse];
          const checkIfExist = previousItems.includes(additionalCourse);
          if (checkIfExist) {
            throw new ResponseError("data error: ", "", [
              "Course Exist in your list ",
            ]);
          } else {
            const updateList = await wishModule.updateList(
              currentList.id,
              allCourses
            );
            res.json({
              msg: `course ${courseAvailable.courseName} added to wishlist`,
            });
          }
        }
      }
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// show user wishList

router.get("/showUserList", async (req, res) => {
  try {
    const { userID } = req.query;
    const userList = await wishModule.showUserList(userID);
    if (!userList) {
      throw new ResponseError("data error: ", ["user don't have a list yet"]);
    } else {
      const courseIdFromList = userList.allCoursesInList;
      const fullCorseInfo = await courseModel.findCoursesFromArr(
        courseIdFromList
      );
      res.json(fullCorseInfo);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// delate item from list

router.delete("/deleteListItem/:courseID", async (req, res) => {
  const userID = req.passId;
  const courseID = req.params.courseID;
  try {
    const verifyUserData = await wishValidation.removeListItemSchemaValidation({
      courseID,
    });
    if (!verifyUserData) {
      throw new ResponseError("data error: ", "", [" "]);
    } else {
      // get user list information
      const userListInfo = await wishModule.showUserList(userID);
      if (!userListInfo) {
        throw new ResponseError("data error: ", "", [
          "user don't have a list ",
        ]);
      } else {
        const checkIfItemExist = await wishModule.removeListItem(
          userListInfo._id,
          courseID
        );

        const currentListItems = await wishModule.showUserList(userID);
        const courseIdFromList = currentListItems.allCoursesInList;
        if (courseIdFromList <= 0) {
          const removeList = await wishModule.deleteList(currentListItems._id);
          res.json({
            msg: "course Removed",
            current: null,
          });
        } else {
          const fullCorseInfo = await courseModel.findCoursesFromArr(
            courseIdFromList
          );
          res.json({
            msg: "course Removed",
            current: fullCorseInfo,
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
