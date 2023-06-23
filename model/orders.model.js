const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  courseID: { type: String, required: true },
  userID: { type: String },
  courseName: { type: String },
  userName: { type: String },
  copiesNeeded: { type: Number },
  privetLesson: { type: Number },
  finalPayment: { type: Number },
});

const Order = mongoose.model("orders", ordersSchema);

const createNewOrder = (userInput) => {
  const newOrder = new Order(userInput);
  return newOrder.save();
};

const findUserOrder = async (userID) => {
  const userOrderExist = await Order.find({userID: userID  });
  return userOrderExist;
};

const calculateOrder = (
  coursePrice =0,
  privetPrice=0,
  privetQ=0,
  bookPrice=0,
  bookQ=0,
) => {
  const total = (bookPrice * bookQ) + (privetPrice * privetQ) + coursePrice;
  return total;
};

module.exports = {
  createNewOrder,
  findUserOrder,
  calculateOrder,
};
