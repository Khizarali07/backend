const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const authController = require("./Controller/authController");
const userController = require("./Controller/userController");
const User = require("./Models/user");
const activityController = require("./Controller/activityController");

dotenv.config({ path: "./config.env" });
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

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

app.use("/api/v1/users/login", authController.login);
app.use("/api/v1/users/signup", authController.signup);

app.use("/api/v1/users/getusers", authController.getAllUsers);

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

app.get("/api/v1/users/delete/:id", authController.deleteuser);
app.get("/api/v1/users/getdata/:id", authController.getdata);
app.post("/api/v1/users/updateuser/:id", authController.updateuser);

// activity Routes :
app.post("/api/v1/users/createactivity", activityController.createActivity);
app.post("/api/v1/users/getallactivity", activityController.allActivity);

app.listen(3000, () => {
  console.log(`App running on port ${3000}...`);
});
