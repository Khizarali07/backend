exports.getAllmanagers = async (req, res, next) => {
  const data = await User.find({ role: "Manager" });

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: data.length,
    data: {
      data,
    },
  });
};
