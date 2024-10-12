const { promisify } = require("util");
const Activity = require("../Models/activity");
const jwt = require("jsonwebtoken");

exports.createActivity = async (req, res, next) => {
  console.log(req.body);
  const newUser = await Activity.create(req.body);
  next();
};

exports.allActivity = async (req, res, next) => {
  const token = req.body.jwt;

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  console.log(decoded.id);

  const currentActivity = await Activity.find({ LinkID: decoded.id });

  res.status(200).json({
    status: "success",
    data: { currentActivity },
  });

  next();
};
