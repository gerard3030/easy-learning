const express = require("express");
const router = express.Router();

const coursesModel = require("../../../model/courses.model");
const coursesValidation = require("../../../validation/courses.validation");
const ResponseError = require("../../../module/ResponseError");

// show course by category 

router.get("/category/:category", async (req, res) => {
  try {
    const categoryFromUser = req.params.category;
    console.log(categoryFromUser);
    const validatedValue = await coursesValidation.showCategorySchemaValidation(
      { category: categoryFromUser }
    );
    if (!validatedValue) {
      throw new ResponseError("req error", ["invalid data"]);
    } else {
      const course = await coursesModel.showCoursesByCategory(categoryFromUser);

      if (course.length <= 0) {
        // res.json( msg:"no course match", );

        throw new ResponseError("db error: ", ["no course match"]);
      } else {
        const info = course.map((item) => item);

        res.json(info);
      }
    }
  } catch (err) {
    res.json({ err });
  }
});



// show products 10 for page
router.get("/:page", async (req, res) => {
  try {
    const userReq = req.params;
    const validatedValue = await coursesValidation.showPageSchemaValidation(
      userReq
    );
    if (!validatedValue) {
      throw new ResponseError("request error", ["invalid data"]);
    } else {
      const showItems = await coursesModel.showCourses(validatedValue.page);
      res.json(showItems);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
