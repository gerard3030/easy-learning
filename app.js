const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const cors = require("cors");

const apiRouter = require("./routes/api");

const cData = require ("./DB_RECORDS/coursesDB")
const uData = require ("./DB_RECORDS/usersDB")

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  fs.mkdir(path.join(__dirname, "uploads"), { recursive: true }, (err) => {
    if (err) throw err;
  });
}

app.use(express.static(path.join(__dirname, "frontend")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRouter);

app.use("*", (req, res) => {
  res.status(404).json({ err: "404 - page not found" });
});

// const insertData = async()=>{
//   try {
//     await uData.addData()
//     await cData.addData()
//     console.log("data inserted")

//   } catch(err) {
//     res.status(400).json({ err });
//   }
// }

// insertData()

module.exports = app;
