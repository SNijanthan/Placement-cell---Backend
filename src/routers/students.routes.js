const express = require("express");
const Students = require("../models/students.model");
const { validateUser } = require("../middlewares/auth.middleware");

const studentsRouter = express.Router();

// Students added into DB
studentsRouter.post("/api/add/students", validateUser, async (req, res) => {
  try {
    const {
      name,
      college,
      status,
      batch,
      dsaFinalScore,
      webDFinalScore,
      reactFinalScore,
    } = req.body;

    const addStudent = new Students({
      name,
      college,
      status,
      batch,
      dsaFinalScore,
      webDFinalScore,
      reactFinalScore,
    });

    const data = await addStudent.save();

    res.status(200).json({ message: "Student added successfully", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieving data from DB
studentsRouter.get("/api/view/students", validateUser, async (req, res) => {
  try {
    const user = await Students.find({});

    if (!user) {
      throw new Error("No students added as of now");
    }

    res
      .status(200)
      .json({ message: "Data retrieved successfully", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update existing students details into DB
studentsRouter.put(
  "/api/update/students/:id",
  validateUser,
  async (req, res) => {
    try {
      const id = req.params.id;

      //   If req.body is empty throws error
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Fields cannot be empty" });
      }

      const updatedStudent = await Students.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      //   If user is not found, throws error
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      //   Student details updated successfully
      const data = await updatedStudent.save();

      res
        .status(200)
        .json({ message: "Student details updated successfully", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Deleting student data
studentsRouter.delete(
  "/api/remove/students/:id",
  validateUser,
  async (req, res) => {
    try {
      const id = req.params.id;
      const removeStudent = await Students.findByIdAndDelete(id);

      if (!removeStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json({
        message: "Student deleted successfully",
        data: removeStudent,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = { studentsRouter };
