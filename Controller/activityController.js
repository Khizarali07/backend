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
  if (req.body.formData.LinkID) {
    const user = await User.findById(req.body.formData.LinkID);
    if (user) {
      // Set assignedTo with the user's full name
      req.body.formData.assignedTo = `${user.firstName} ${user.lastName}`;
    } else {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  }

  const data = await Activity.findByIdAndUpdate(
    req.params.id,
    req.body.formData,
    { new: true, runValidators: true } // Return the updated document and validate new data
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
