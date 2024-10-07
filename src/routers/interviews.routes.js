const express = require("express");
const { validateUser } = require("../middlewares/auth.middleware");
const Interview = require("../models/interview.model");
const Student = require("../models/students.model");
const Result = require("../models/result.model");

const interViewRouter = express.Router();

// Create new Interview
interViewRouter.post("/api/interviews", validateUser, async (req, res) => {
  try {
    const { company, date } = req.body;
    const newInterview = new Interview({ company, date });
    await newInterview.save();
    res
      .status(201)
      .json({ message: "Interview created successfully", newInterview });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Interviews
interViewRouter.get("/api/interviews", validateUser, async (req, res) => {
  try {
    const interviews = await Interview.find().populate("students");
    res.status(200).json(interviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Interview by ID
interViewRouter.get("/api/interviews/:id", validateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const interview = await Interview.findById(id).populate("students");
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Allocate a student to an Interview
interViewRouter.post(
  "/api/interviews/:id/allocate",
  validateUser,
  async (req, res) => {
    const { id } = req.params;
    const { studentId } = req.body;
    try {
      const interview = await Interview.findById(id);
      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }

      // Check if the student exists
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Allocate student to interview
      interview.students.push(studentId);
      await interview.save();

      res
        .status(200)
        .json({ message: "Student allocated to interview", interview });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete an Interview by ID
interViewRouter.delete(
  "/api/interviews/:id",
  validateUser,
  async (req, res) => {
    const { id } = req.params;
    try {
      const interview = await Interview.findByIdAndDelete(id);
      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }
      res.status(200).json({ message: "Interview deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = { interViewRouter };
