const { Router } = require("express");
const assignmentModel = require("../Models/assignment");
const { postOne, getAll } = require("../Controllers/assignment");

const assignmentRouter = Router();

assignmentRouter.get("/all", getAll);

assignmentRouter.post("/", postOne);

module.exports = assignmentRouter;
