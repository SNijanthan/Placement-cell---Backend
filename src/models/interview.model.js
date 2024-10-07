const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Company name should be more than 1 letter"],
      maxLength: [50, "Company name cannot be more than 50 letters"],
    },
    date: {
      type: Date,
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
