const express = require("express");
const cors = require("cors");
const authRouter = require("./Routes/auth.routes");
const assignmentRouter = require("./Routes/assignment.routes");
require("dotenv").config();
const connection = require("./DB/db");

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

app.get("/", (req, res) => {
  return res.send("hello world!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to port " + PORT);
  } catch (err) {
    console.log("something went wrong");
  }
});
