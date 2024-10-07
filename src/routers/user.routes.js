const express = require("express");
const User = require("../models/user.model");
const { signupValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

// User Signin
userRouter.post("/api/auth/signup", async (req, res) => {
  try {
    signupValidation(req);

    const { firstName, lastName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();

    res.status(200).json({ message: "User added successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// user login
userRouter.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // If user is existing or not
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User logout
userRouter.post("/api/auth/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { userRouter };
