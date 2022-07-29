const { Router } = require("express");
const {
  assignmentPatcher,
  assignmentGetter,
  studentAssCount,
} = require("../Controllers/studentAss");

const studentAssRouter = Router();

studentAssRouter.get("/:user_id", assignmentGetter);
studentAssRouter.get("/count/:student_id", studentAssCount);
studentAssRouter.patch("/iscompleted", assignmentPatcher);

module.exports = studentAssRouter;
