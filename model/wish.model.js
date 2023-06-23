const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
  productID: { type: String, required: true },
  userID: { type: String },
  allCoursesInList: [String],
});

const WishList = mongoose.model("wishList", wishListSchema);

const createNewList = (listData, id) => {
  const newList = new WishList(listData);
  newList.userID = id;
  newList.allCoursesInList = [listData.productID];
  return newList.save();
};

const checkForUserList = (_id) => {
  const hasList = WishList.find({ userID: _id });
  return hasList;
};

const updateList = (id, newData) => {
  return WishList.findByIdAndUpdate(id, { allCoursesInList: newData })
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

const showUserList = (userID)=>{
  return WishList.findOne({userID:userID})
}

const removeListItem = async (listID,itemID)=>{
  const userList =await WishList.findById(listID)
  const courseInList= await userList.allCoursesInList
  const rest = courseInList.filter((listItem)=>{
    let updatedList = listItem !=itemID
  return updatedList})
  updateList(listID, rest)
  return "Item removed from list"
}

const deleteList = (listID)=>{
  const remove = WishList.findByIdAndDelete(listID);
  return remove
}




module.exports = {
  createNewList,
  checkForUserList,
  updateList,
  showUserList,
  removeListItem,
  deleteList,
};
