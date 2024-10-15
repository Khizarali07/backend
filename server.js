const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const authController = require("./Controller/authController");
const userController = require("./Controller/userController");
const User = require("./Models/user");
const activityController = require("./Controller/activityController");
const managerController = require("./Controller/managerController");

// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });
const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser());
app.use(cookieParser());

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

console.log(DB);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.error("DB connection error:", err.message);
    process.exit(1); // Exit on database connection error
  });

// auth Routes :
app.use("/api/v1/users/login", authController.login);

app.use("/api/v1/users/getallusers", authController.getAll);
app.use(
  "/api/v1/users/dateasc",
  userController.aliasTopToursasc,
  userController.getAll
);
app.use(
  "/api/v1/users/datedesc",
  userController.aliasTopToursdesc,
  userController.getAll
);

app.use(
  "/api/v1/users/active",
  userController.aliasTopToursAasc,
  userController.getAll
);
app.use(
  "/api/v1/users/activedesc",
  userController.aliasTopToursAdesc,
  userController.getAll
);

app.use(
  "/api/v1/users/lactive",
  userController.aliasTopTourslasc,
  userController.getAll
);
app.use(
  "/api/v1/users/lactivedesc",
  userController.aliasTopToursldesc,
  userController.getAll
);

app.use(
  "/api/v1/users/notactive",
  userController.aliasTopToursnotasc,
  userController.getAll
);
app.use(
  "/api/v1/users/notactivedesc",
  userController.aliasTopToursnotdesc,
  userController.getAll
);

//manager Routes :
app.post("/api/v1/users/signup", authController.signup);
app.get("/api/v1/users/getmanagers", managerController.getAllmanagers);
app.post("/api/v1/users/updateuser/:id", authController.updateuser);
app.get("/api/v1/users/delete/:id", authController.deleteuser);

// user Routes :
app.get("/api/v1/users/getdata/:token", authController.getdata);
app.post("/api/v1/users/createmember", userController.createmember);
app.use("/api/v1/users/getusers", authController.getAllUsers);

// activity Routes :
app.post("/api/v1/users/createactivity", activityController.createActivity);
app.post("/api/v1/users/getactivity", activityController.allActivity);
app.get("/api/v1/users/getallactivity", activityController.getallActivity);
app.get("/api/v1/users/deleteactivity/:id", activityController.deleteActivity);
app.post("/api/v1/users/updateactivity/:id", activityController.updateActivity);

app.listen(3000, () => {
  console.log(`App running on port ${3000}...`);
});
