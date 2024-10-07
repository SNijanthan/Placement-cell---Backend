const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },
    result: {
      type: String,
      required: true,
      enum: {
        values: ["PASS", "FAIL", "On Hold", "Didn't Attempt"],
        message:
          "{VALUE} not defined. Defined values are 'PASS', 'FAIL', 'On Hold', 'Didn't Attempt'",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
