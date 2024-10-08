const express = require("express");
const { validateUser } = require("../middlewares/auth.middleware");
const Result = require("../models/result.model");
const Student = require("../models/students.model");
const Interview = require("../models/interview.model");
const ExcelJS = require("exceljs");

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
    const results = await Result.find().populate(
      "student interview",
      "name college batch company date"
    );

    if (results.length === 0) {
      return res.json({ message: "No data available" });
    }
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

// Download XLSX of all results
resultRouter.get("/api/results/download", validateUser, async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student")
      .populate("interview");

    // Create a new Excel workbook and sheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Results");

    // Define the header row
    worksheet.columns = [
      { header: "Student ID", key: "studentId", width: 20 },
      { header: "Student Name", key: "studentName", width: 30 },
      { header: "Student College", key: "studentCollege", width: 30 },
      { header: "Student Status", key: "studentStatus", width: 15 },
      { header: "DSA Final Score", key: "DSA_FinalScore", width: 15 },
      { header: "WebD Final Score", key: "WebD_FinalScore", width: 15 },
      { header: "React Final Score", key: "React_FinalScore", width: 15 },
      { header: "Interview Date", key: "interviewDate", width: 25 },
      { header: "Interview Company", key: "interviewCompany", width: 25 },
      {
        header: "Interview Student Result",
        key: "interviewStudentResult",
        width: 20,
      },
    ];

    // Add rows from the database results
    results.forEach((result) => {
      worksheet.addRow({
        studentId: result.student._id,
        studentName: result.student.name,
        studentCollege: result.student.college,
        studentStatus: result.student.status,
        DSA_FinalScore: result.student.dsaFinalScore,
        WebD_FinalScore: result.student.webDFinalScore,
        React_FinalScore: result.student.reactFinalScore,
        interviewDate: result.interview.date,
        interviewCompany: result.interview.company,
        interviewStudentResult: result.result,
      });
    });

    // Write the workbook to a buffer and send it as a downloadable file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=results.xlsx");

    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { resultRouter };
