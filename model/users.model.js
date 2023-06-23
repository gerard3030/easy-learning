const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    country: { type: String },
    city: { type: String },
    street: { type: String },
    houseNumber: { type: String },
    zip: { type: String },
  },
  phone: { type: String },
  isAdmin: { type: Boolean, default: false },
  isVip: { type: Boolean, default: false },
  userIMG: { type:String },
  accountSecurity: {
    failedAttempts: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    lastAttempt: { type: Date, default: Date.now },
  },
});


const Users = mongoose.model("users", usersSchema);

const createNewUser = (userData) => {
  const newUser = new Users(userData);
  return newUser.save();
};

const findUserByEmail = (email) => {
  return Users.findOne({ email });
};

const findUserByPhone = (phone) => {
  return Users.findOne({ phone });
};

const blockAccount = (_id) => {
  return Users.findByIdAndUpdate(_id, {
    "accountSecurity.isBlocked": true,
    "accountSecurity.failedAttempts": 0,
  });
};

const updateUserAttempt = (_id, currentAttempts) => {
  return Users.findByIdAndUpdate(_id, {
    "accountSecurity.failedAttempts": currentAttempts + 1,
  });
};

const unBlockAccount = (_id) => {
  return Users.findByIdAndUpdate(_id, {
    "accountSecurity.isBlocked": false,
    "accountSecurity.failedAttempts": 0,
  });
};


const updateUserPassword = (id, newPassword) => {
  return Users.findByIdAndUpdate(id, { password: newPassword });
};

const findByID = (id) => Users.findById(id);

const updateUserData = (userID,newData)=>Users.findByIdAndUpdate(userID, newData)

const deleteUser = (userID) => Users.findByIdAndDelete(userID);

module.exports = {
  createNewUser,
  findUserByEmail,
  updateUserPassword,
  blockAccount,
  unBlockAccount,
  findByID,
  updateUserAttempt,
  Users,
  updateUserData,
  deleteUser,
  findUserByPhone
};
