const mongoose = require("mongoose");
const User = require("./user");

const activitySchema = new mongoose.Schema({
  LinkID: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Assuming this refers to the "User" model
    required: [true, "Please enter a valid user ID"],
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Assuming this refers to the "User" model
    required: [true, "Please enter a valid user ID"],
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
    default: "No activity description",
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
    default: null,
  },
});

// activitySchema.pre("save", async function (next) {
//   // If LinkID is present and assignedTo is not yet set
//   if (this.LinkID && !this.assignedTo) {
//     // Fetch the user based on the LinkID
//     const user = await User.findById(this.LinkID);

//     if (user) {
//       // Set the assignedTo field as the user's full name
//       this.assignedTo = `${user.firstName} ${user.lastName}`;
//     } else {
//       return next(new Error("User not found")); // Handle the case where the user is not found
//     }
//   }
//   next();
// });

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
