const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nijanthan378:wQs7rZiuhhz5m2cE@cluster0.qua2b.mongodb.net/PlacementCell"
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { connectToDatabase };
