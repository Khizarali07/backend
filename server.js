const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const dotenv = require("dotenv");

const authController = require("./Controller/authController");
const userController = require("./Controller/userController");
const User = require("./Models/user");
const activityController = require("./Controller/activityController");

// dotenv.config({ path: "./config.env" });
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://frontend-er7j.vercel.app", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you need to send cookies or headers with requests
  })
);
app.use(cookieParser());

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.error("DB connection error:", err.message);
    process.exit(1); // Exit on database connection error
  });

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
app.get("/api/v1/users/getdata/:token", authController.getdata);
app.post("/api/v1/users/updateuser/:id", authController.updateuser);

// activity Routes :
app.post("/api/v1/users/createactivity/:id", activityController.createActivity);
app.post("/api/v1/users/getallactivity", activityController.allActivity);
app.get("/api/v1/users/deleteactivity/:id", activityController.deleteActivity);
app.post("/api/v1/users/updateactivity/:id", activityController.updateActivity);

app.listen(3000, () => {
  console.log(`App running on port ${3000}...`);
});
