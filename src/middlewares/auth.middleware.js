const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "User not logged in, Kindly login" });
    }

    const isTokenValid = await jwt.verify(token, "SECRETE-KEY");

    const { _id } = isTokenValid;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { validateUser };
