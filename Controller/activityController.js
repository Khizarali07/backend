const { promisify } = require("util");
const Activity = require("../Models/activity");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const User = require("../Models/user");

exports.createActivity = async (req, res, next) => {
  const user = await User.findById(req.body.formData.linkID);
  req.body.formData.assignedTo = `${user.firstName} ${user.lastName}`;
  const currentActivity = await Activity.create(req.body.formData);
  console.log(currentActivity);

  res.status(200).json({
    status: "success",
    data: { currentActivity },
  });
  next();
};

exports.allActivity = async (req, res, next) => {
  const token = req.body.jwt;

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentActivity = await Activity.find({ LinkID: decoded.id });

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
