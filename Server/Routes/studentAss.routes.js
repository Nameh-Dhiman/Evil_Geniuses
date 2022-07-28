const { Router } = require("express");
const {
  assignmentPatcher,
  assignmentGetter,
} = require("../Controllers/studentAss");

const studentAssRouter = Router();

studentAssRouter.get("/:user_id", assignmentGetter);

studentAssRouter.patch("/iscompleted", assignmentPatcher);

module.exports = studentAssRouter;
