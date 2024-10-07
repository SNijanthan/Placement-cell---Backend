const express = require("express");
const { validateUser } = require("../middlewares/auth.middleware");
const Result = require("../models/result.model");
const Student = require("../models/students.model");
const Interview = require("../models/interview.model");
const json2csv = require("json2csv").parse; // NPM library to convert JSON to CSV

const resultRouter = express.Router();

// Create a new Result
resultRouter.post("/api/results", validateUser, async (req, res) => {
  try {
    const { studentId, interviewId, result } = req.body;

    // Validate student and interview exist
    const student = await Student.findById(studentId);
    const interview = await Interview.findById(interviewId);
    if (!student || !interview) {
      return res.status(404).json({ error: "Student or Interview not found" });
    }

    const newResult = new Result({
      student: studentId,
      interview: interviewId,
      result,
    });
    await newResult.save();
    res.status(201).json({ message: "Result created successfully", newResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Results
resultRouter.get("/api/results", validateUser, async (req, res) => {
  try {
    const results = await Result.find().populate("student interview");
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a Result by ID
resultRouter.put("/api/results/:id", validateUser, async (req, res) => {
  const { id } = req.params;
  const { result } = req.body;
  try {
    const updatedResult = await Result.findByIdAndUpdate(
      id,
      { result },
      { new: true }
    );
    if (!updatedResult) {
      return res.status(404).json({ error: "Result not found" });
    }
    res
      .status(200)
      .json({ message: "Result updated successfully", updatedResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Result by ID
resultRouter.delete("/api/results/:id", validateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedResult = await Result.findByIdAndDelete(id);
    if (!deletedResult) {
      return res.status(404).json({ error: "Result not found" });
    }
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Download CSV of Results
resultRouter.get("/api/results/download", validateUser, async (req, res) => {
  try {
    const results = await Result.find().populate("student interview");

    // Transform results into CSV format
    const csvData = results.map((result) => ({
      studentId: result.student._id,
      studentName: result.student.name, // assuming you have a `name` field in Student model
      interviewCompany: result.interview.companyName, // assuming you have a `companyName` field in Interview model
      interviewDate: result.interview.date,
      result: result.result,
    }));

    const csv = json2csv(csvData);
    res.header("Content-Type", "text/csv");
    res.attachment("results.csv");
    res.send(csv);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { resultRouter };
