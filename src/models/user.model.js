const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Should be more than 1 letters"],
      maxLength: [15, "Cannot be more than 15 letters"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Should be more than 1 letters"],
      maxLength: [15, "Cannot be more than 15 letters"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Weak password, Try something different");
        }
      },
    },
  },
  { timestamps: true }
);

// Password validation
userSchema.methods.validatePassword = async function (userGivenPassword) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(userGivenPassword, passwordHash);

  return isPasswordValid;
};

// Creating JWT tokens
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "SECRETE-KEY", {
    expiresIn: "7d",
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
