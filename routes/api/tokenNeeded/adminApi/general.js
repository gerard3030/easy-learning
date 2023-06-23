const express = require("express");
const router = express.Router();

const coursesModel = require("../../../../model/courses.model");
const coursesValidation = require("../../../../validation/courses.validation");
const ResponseError = require("../../../../module/ResponseError");


const upload = require("../../../../config/multer")
const path = require("path")
const fs = require("fs")

// add course

// router.post("/addImg", upload.single("Img"), async (req, res) => {
//   try {
//     const adminData = req.body;
//     let dataObj = {
//       pageName:adminData.pageName,
//     }  
//     console.log()
//     const data = {...dataObj,Img:req.file.filename}
//     console.log(data)
//     const dataToDB = await coursesModel.createNewCourse(
//       data,
//       req.passId
//     );
//     if (!dataToDB) {
//       throw new ResponseError("request error", ["invalid data"]);
//     }
//     res.json({
//       msg: "course added to DB",
//     });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });











module.exports = router;
