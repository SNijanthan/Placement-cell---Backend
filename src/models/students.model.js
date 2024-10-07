const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "Should be more than 1 letters"],
      maxLength: [15, "Cannot be more than 15 letters"],
    },
    college: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["placed", "not placed"],
        message:
          "{VALUE} not defined. Defined values are 'placed', 'not placed'",
      },
    },
    batch: {
      type: Number,
      required: true,
    },
    dsaFinalScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    webDFinalScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    reactFinalScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentsSchema);
