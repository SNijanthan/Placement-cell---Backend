const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectToDatabase } = require("./src/config/database");
const { userRouter } = require("./src/routers/user.routes");
const { studentsRouter } = require("./src/routers/students.routes");
const { interViewRouter } = require("./src/routers/interviews.routes");
const { resultRouter } = require("./src/routers/result.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.use("/", studentsRouter);
app.use("/", interViewRouter);
app.use("/", resultRouter);

const port = 9000;

connectToDatabase()
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
