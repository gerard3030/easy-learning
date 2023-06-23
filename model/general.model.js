const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imgSchema = new Schema({
  pageName: { type: String, required: true },
  courseImg:{type:String},
  addedBy: { type: String },
});

const Imgs = mongoose.model("imgs", imgSchema);

const createNewImg = (imgData, adminID) => {
  const newImg = new Imgs(imgData);
  newImg.addedBy = adminID;
  return newImg.save();
};


module.exports = { createNewImg };
