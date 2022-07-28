const { Router } = require("express");
const { getAllInstructors } = require("../Controllers/user");

const userRouter = Router();

userRouter.get("/instructors", getAllInstructors);

module.exports = userRouter;
