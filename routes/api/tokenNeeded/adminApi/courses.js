const express = require("express");
const router = express.Router();

const coursesModel = require("../../../../model/courses.model");
const coursesValidation = require("../../../../validation/courses.validation");
const ResponseError = require("../../../../module/ResponseError");

const upload = require("../../../../config/multer");
const path = require("path");


// add course with img

router.post("/addCourseImg", upload.single("courseImg"), async (req, res) => {
  try {
    const adminData = req.body;
    let dataObj = {
      courseName: adminData.courseName,
      category: adminData.category,
      lecturer: adminData.lecturer,
      description: adminData.description,
      totalHours:adminData.totalHours,
      price: {
        coursePrice: adminData.coursePrice,
        privetPrice: adminData.privetPrice,
        copyPrice: adminData.copyPrice,
      },
      printCopy: {
        copyStockAmount: adminData.copyStockAmount,
      },
    };
    const validatedData = await coursesValidation.courseSchemaValidation(
      dataObj
    );
    const data = { ...validatedData, courseImg: req.file.filename };
    const dataToDB = await coursesModel.createNewCourse(data, req.passId);
    if (!dataToDB) {
      throw new ResponseError("request error", ["invalid data"]);
    }
    res.json({
      msg: "course added to DB",
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// add without img

router.post("/addCourse", async (req, res) => {
  try {
    const adminData = req.body;
    const validatedData = await coursesValidation.courseSchemaValidation(
      adminData
    );

    // const fullPath = path.join(
    //   __dirname,
    //   "../../../../uploads/soon-1683478450235-902731383.jpg"
    // );

    const data = {
      ...validatedData,
      courseImg: "soon-1683478450235-902731383.jpg",
    };
    const dataToDB = await coursesModel.createNewCourse(data, req.passId);
    if (!dataToDB) {
      throw new ResponseError("request error", ["invalid data"]);
    }
    res.json({
      msg: "course added to DB",
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// edit course

router.patch("/editCourse", async (req, res) => {
  try {
    const dataFromAdmin = req.body;
    const validatedData = await coursesValidation.editProductSchemaValidation(
      dataFromAdmin
    );

    const verifyCourseID = await coursesModel.findCourseByID(
      validatedData.productID
    );

    if (!verifyCourseID) {
      throw new ResponseError("request error", ["course do not exist"]);
    }
    const updatedData = await coursesModel.updateCourse(
      validatedData.productID,
      validatedData.filedToUpdate,
      validatedData.dataUpdated
    );
    res.json({
      msg: "data updated",
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// delete course

router.delete("/deleteCourse", async (req, res) => {
  try {
    const adminData = req.body;

    const verifyData = await coursesValidation.deleteCourseSchemaValidation(
      adminData
    );
    if (!verifyData) {
      throw new ResponseError("request error", ["course do not exist"]);
    }
    const courseExists = await coursesModel.findCourseByID(
      verifyData.productID
    );
    if (!courseExists) {
      throw new ResponseError("request error", ["course do not exist"]);
    }
    const deleteCourse = await coursesModel.deleteCourse(courseExists._id);
    res.json({
      msg: `${courseExists.courseName} deleted`,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// get course information

router.get("/getCourseInfo/:page", async (req, res) => {
  try {
    const userReq = req.params.page;
    const courseData = await coursesModel.findCourseByID(userReq);
    res.json(courseData);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
