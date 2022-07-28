const express = require("express");
const cors = require("cors");
const authRouter = require("./Routes/auth.routes");
const assignmentRouter = require("./Routes/assignment.routes");
const studentAss = require("./Routes/studentAss.routes");
const gradeRouter = require("./Routes/grades.routes");
const moneyRouter = require("./Routes/money.routes");
require("dotenv").config();
const connection = require("./DB/db");
const userRouter = require("./Routes/user.routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", authRouter);
app.use("/api/assignments", assignmentRouter);
app.use("/api/studentass", studentAss);
app.use("/api/grades", gradeRouter);
app.use("/api/money", moneyRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  return res.send("Excelligent Backend!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to port" + PORT);
  } catch (err) {
    console.log("something went wrong");
  }
});
