const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  lastName: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  photo: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBBTsAvrej7tSjG9gSIxcJ4QU9R6qLNoCjWQ&s",
  },
  status: {
    type: String,
    enum: ["Active", "Less Active", "Do Not Contact"],
    default: "Active",
  },
  datecreated: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Member"],
    default: "Manager",
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
