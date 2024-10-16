const { promisify } = require("util");
const Activity = require("../Models/activity");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

exports.createActivity = async (req, res, next) => {
  const currentActivity = await Activity.create(req.body.formData);
  console.log(currentActivity);

  res.status(200).json({
    status: "success",
    data: { currentActivity },
  });
  next();
};

exports.getallActivity = async (req, res, next) => {
  const currentActivity = await Activity.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: currentActivity.length,
    data: {
      currentActivity,
    },
  });

  next();
};

exports.allActivity = async (req, res, next) => {
  const token = req.body.jwt;

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentActivity = await Activity.find({ assignedTo: decoded.id });

  res.status(200).json({
    status: "success",
    data: { currentActivity },
  });

  next();
};

exports.deleteActivity = async (req, res, next) => {
  const tour = await Activity.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });

  next();
};

exports.updateActivity = async (req, res, next) => {
  const data = await Activity.findByIdAndUpdate(
    req.params.id,
    req.body.formData
  );
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
