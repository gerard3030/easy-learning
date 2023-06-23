const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  category: { type: String },
  lecturer: { type: String },
  description: { type: String },
  courseImg:{type:String},
  price: {
    coursePrice: { type: Number, default: 30 },
    privetPrice: { type: Number, default: 30 },
    copyPrice: { type: Number, default: 15 },
  },
  totalHours: { type: Number, default:30 },
  isPrivetSession: { type: Boolean, default: false },
  printCopy: {
    isPrintAvailable: { type: Boolean, default: true },
    copyStockAmount: { type: Number, default: 100 },
    
  },
  
  addedBy: { type: String },
  lecturerEmail: {type:String}


});

const Courses = mongoose.model("courses", courseSchema);

const createNewCourse = (courseData, adminID) => {
  const newCourse = new Courses(courseData);
  newCourse.addedBy = adminID;
  newCourse.lecturerEmail = `${courseData.lecturer}@lecturer.com`
  return newCourse.save();
};

const showCourses = (pageNum = 1, itemPerPage = 3
  ) => {
  const allCourses = Courses.find()
    .skip((pageNum - 1) * itemPerPage)
    .limit(itemPerPage)
  return allCourses;
};

const showRadonCourse = ( itemPerPage = 2
  ) => {
    const randomNumber = Math.floor(Math.random() * (7 - 0 + 1) + 0)
  const allCourses = Courses.find()
    .skip(randomNumber)
    .limit(itemPerPage)
  return allCourses;
};

// need validation


const showCoursesByCategory = async (category)=> await Courses.find({category})

// need validation
const updateCourse = (_id, filed, dataUpdated) => {
  return Courses.findByIdAndUpdate({ _id }, { [filed]: dataUpdated });
};

const deleteCourse = (courseID) => Courses.findByIdAndDelete(courseID);

const updatePrintedQ = (id, newQ) => {
  return Courses.findByIdAndUpdate(id, { "printCopy.copyStockAmount": newQ })
    .then((err, data) => {
      if (!err) {
        data;
      } else {
        throw err;
      }
    })
    .catch((error) => {
      error;
    });
};

const printedNotInStock = (id, newQ) => {
  return Courses.findByIdAndUpdate(id, { "isPrintAvailable": newQ })
    .then((err, data) => {
      if (!err) {
        data;
      } else {
        throw err;
      }
    })
    .catch((error) => {
      error;
    });
};

// const findCourseByID =async (_id) => await Courses.findById(_id).then((data) => data).catch((err) => err);

const insertData = (data)=>{
  Courses.insertMany(data).then(function(){}).catch(function(error){
    console.log(error)      // Failure
});
}


const findCoursesFromArr =async  (ids)=> await Courses.find({ '_id': { $in: ids } });

// const findTest = (id)=>{
//   Courses.findById(id, function (err, docs) {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log("Result : ", docs);
//     }
// });
// }

const findCourseByID =async (id)=> await Courses.findById(id)






module.exports = {
  createNewCourse,
  showCourses,
  updateCourse,
  deleteCourse,
  findCourseByID,
  updatePrintedQ,
  printedNotInStock,
  insertData,
  showCoursesByCategory,
  findCoursesFromArr,
  showRadonCourse,

  // findTest
};
