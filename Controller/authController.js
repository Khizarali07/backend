const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const APIFeatures = require("./apifeatures");
const { ObjectId } = require("mongoose").Types;

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  console.log(token);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    console.log("email or password don't match");
    return res.status(200).json({ message: "Invalid email or password" });
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
  console.log("everything ok !!!");
  next();
};

exports.signup = async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create(req.body.formData);
  next();
};

exports.deleteuser = async (req, res, next) => {
  const tour = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });

  next();
};

exports.getAllUsers = async (req, res, next) => {
  const data = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: data.length,
    data: {
      data,
    },
  });
};

exports.getdata = async (req, res, next) => {
  const data = await User.findById(req.params.id);

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: data.length,
    data: {
      data,
    },
  });
};

exports.updateuser = async (req, res, next) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body.formData);
  console.log(data);
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: data.length,
    data: {
      data,
    },
  });
};
