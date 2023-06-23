const express = require("express");
const router = express.Router();

const ordersModule = require("../../../../model/orders.model");
const orderValidation = require("../../../../validation/orders.validation");
const courseModel = require("../../../../model/courses.model");
const usersModel = require("../../../../model/users.model");
const ResponseError = require("../../../../module/ResponseError");

router.post("/order", async (req, res) => {
  try {
    const userOrderData = req.body;
    const userID = req.passId;
    const findUserByToken = await usersModel.findByID(userID);
    // compare user token with request id for additional Security
    const verifyData = await orderValidation.ordersSchemaValidation(
      userOrderData
    );
    if (!verifyData) {
      throw new ResponseError("request error", ["invalid data"]);
    } else {
      if (userID != verifyData.userID && findUserByToken.isAdmin == false) {
        throw new ResponseError("request error", [
          "user ID do not match user Token hacking attempt ! ",
        ]);
      }
      // check if course available
      const courseAvailable = await courseModel.findCourseByID(
        verifyData.courseID
      );
      if (!courseAvailable) {
        throw new ResponseError("no data: ", [
          `Course can't be found - Please contact Office`,
        ]);
      } else {
        const hasOrder = await ordersModule.findUserOrder(userOrderData.userID);
        if (hasOrder.length > 0) {
          throw new ResponseError("request error", [
            "user already placed order",
          ]);
        } else {
          const findUser = await usersModel.findByID(userOrderData.userID);
          let orderInfo = {
            courseID: courseAvailable._id,
            userID: findUser._id,
            userName: findUser.firstName,
            courseName: courseAvailable.courseName,
            copiesNeeded: 0,
            privetLesson: 0,
            finalPayment: ordersModule.calculateOrder(
              courseAvailable.price.coursePrice,
              courseAvailable.price.privetPrice,
              userOrderData.privetLesson,
              courseAvailable.price.copyPrice,
              userOrderData.copiesNeeded
            ),
          };
          // check  notebook stock if needed
          if (verifyData.copiesNeeded !== 0) {
            if (
              verifyData.copiesNeeded >
              courseAvailable.printCopy.copyStockAmount
            ) {
              throw new ResponseError("request error", [
                `${courseAvailable.printCopy.copyStockAmount} has left in stock, please contact the office for more info`,
              ]);
            } else {
              const newOrder = { ...orderInfo, ...verifyData };
              await courseModel.updatePrintedQ(
                newOrder.courseID,
                courseAvailable.printCopy.copyStockAmount -
                  newOrder.copiesNeeded
              );
              const placeNewOrder = await ordersModule.createNewOrder(newOrder);
              if (courseAvailable.printCopy.copyStockAmount < 1) {
                await courseModel.updateCourse(
                  verifyData.courseID,
                  "printCopy.isPrintAvailable",
                  false
                );
              }
              res.json({
                msg: " order placed!",
                toUser: `Hey ${placeNewOrder.userName}, your order for ${courseAvailable.courseName} online has been placed.`,
              });
            }
          } else {
            const newOrder = { ...orderInfo, ...verifyData };
            await courseModel.updatePrintedQ(
              newOrder.courseID,
              courseAvailable.printCopy.copyStockAmount - newOrder.copiesNeeded
            );

            const placeNewOrder = await ordersModule.createNewOrder(newOrder);

            if (courseAvailable.printCopy.copyStockAmount < 1) {
              await courseModel.updateCourse(
                verifyData.courseID,
                "printCopy.isPrintAvailable",
                false
              );
            }
            res.json({
              msg: " order placed!",
              toUser: `Hey ${placeNewOrder.userName}, your order for ${courseAvailable.courseName} online has been placed.`,
            });
          }
        }
      }
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
