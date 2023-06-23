const express = require("express");
const router = express.Router();

const authmv = require("../middleware/auth.mv");
const authmvAdmin = require("../middleware/auth.mv.admin");

const openToAllAuthRouter = require("./api/noTokenNeeded/auth");
const openToAllCoursesRouter = require("./api/noTokenNeeded/courses");
const openToAdminCoursesRouter = require("./api/tokenNeeded/adminApi/courses");
const openToAdminClientsRouter = require("./api/tokenNeeded/adminApi/clients");
const openToClientsGeneralRouter = require("./api/tokenNeeded/userApi/general");
const openToClientsOrdersRouter = require("./api/tokenNeeded/userApi/orders");
const openToClientsWishRouter = require("./api/tokenNeeded/userApi/wish");

// open to all
router.use("/", openToAllCoursesRouter, openToAllAuthRouter);

// admin only
router.use(
  "/admin",
  authmvAdmin,
  openToAdminCoursesRouter,
  openToAdminClientsRouter
);

// existing users only
router.use(
  "/users",
  authmv,
  openToClientsGeneralRouter,
  openToClientsOrdersRouter,
  openToClientsWishRouter
);

module.exports = router;
