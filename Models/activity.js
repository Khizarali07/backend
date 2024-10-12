const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  LinkID: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Assuming this refers to the "User" model
    required: [true, "Please enter a valid user ID"],
  },
  assignedTo: {
    type: String,
  },
  dateAssigned: {
    type: Date,
    default: Date.now, // Automatically assigns the current date when a record is created
  },
  dateActivity: {
    type: Date,
    default: null,
  },
  activityDescription: {
    type: String,
  },
  notes: {
    type: String, // Allows storing text or comments about the activity
    trim: true, // Trims whitespace from the input
  },
  reason: {
    type: String,
  },
  dateFollowUp: {
    type: Date, // Added this based on your table structure, for follow-up activities
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
