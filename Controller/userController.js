const APIFeatures = require("./apifeatures");
const User = require("../Models/user");
const Member = require("../Models/member");

exports.getAll = async (req, res, next) => {
  // To allow for nested GET reviews on tour (hack)
  let filter = {};

  filter = await req.query.fields; // Ensure you properly handle fields here

  // console.log(filter);

  const features = await Member.find(filter).sort(req.query.sort);
  console.log(features);

  // const doc = await features.query.explain();
  const doc = await features;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  });
  next();
};

exports.aliasTopToursasc = (req, res, next) => {
  req.query.sort = "datecreated";

  next();
};
exports.aliasTopToursdesc = (req, res, next) => {
  req.query.sort = "-datecreated";

  next();
};

exports.aliasTopToursAasc = (req, res, next) => {
  req.query.sort = "datecreated";
  req.query.fields = { status: "Active" };
  next();
};
exports.aliasTopToursAdesc = (req, res, next) => {
  req.query.sort = "-datecreated";
  req.query.fields = { status: "Active" };
  next();
};

exports.aliasTopTourslasc = (req, res, next) => {
  req.query.sort = "datecreated";
  req.query.fields = { status: "Less Active" };
  next();
};
exports.aliasTopToursldesc = (req, res, next) => {
  req.query.sort = "-datecreated";
  req.query.fields = { status: "Less Active" };
  next();
};

exports.aliasTopToursnotasc = (req, res, next) => {
  req.query.sort = "datecreated";
  req.query.fields = { status: "Do Not Contact" };
  next();
};
exports.aliasTopToursnotdesc = (req, res, next) => {
  req.query.sort = "-datecreated";
  req.query.fields = { status: "Do Not Contact" };
  next();
};

exports.createmember = async (req, res, next) => {
  const newUser = await Member.create(req.body.formData);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });

  next();
};
