const { Router } = require("express");
const {
  getAllInstructors,
  updateUser,
  getUser,
} = require("../Controllers/user");

const userRouter = Router();

userRouter.get("/instructors", getAllInstructors);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);

module.exports = userRouter;
