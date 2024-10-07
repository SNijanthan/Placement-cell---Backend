const validator = require("validator");
const bcrypt = require("bcrypt");

const signupValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name cannot be empty");
  } else if (firstName.length < 2 || lastName.length < 2) {
    throw new Error("Name should be at lease more than 1 letters");
  } else if (firstName.length > 15 || lastName.length > 15) {
    throw new Error("Name should not be more than 15 letters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email format");
  } else if (!password) {
    throw new Error("Password field cannot be empty");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Weak password, Try another password");
  }
};

const validateHashPassword = async () => {};

module.exports = { signupValidation, validateHashPassword };
