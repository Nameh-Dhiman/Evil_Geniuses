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
const loanRouter = require("./Routes/loan.routes");
const conversationRoute = require("./Routes/conversations.routes");
const messageRoute = require("./Routes/message.routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/messages", messageRoute);
app.use("/conversation", conversationRoute);
app.use("/api/auth", authRouter);
app.use("/api/assignments", assignmentRouter);
app.use("/api/studentass", studentAss);
app.use("/api/grades", gradeRouter);
app.use("/api/money", moneyRouter);
app.use("/api/users", userRouter);
app.use("/api/loan", loanRouter);

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  //When connected
  console.log("A user Connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //sending Message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when Disconnected
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

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
