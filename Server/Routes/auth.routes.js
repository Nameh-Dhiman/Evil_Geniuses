const { Router } = require("express");
const userModel = require("../Models/user");
const authRouter = Router();
const { signup, signin } = require("../Controllers/auth");

authRouter.post("/signup", signup);

authRouter.post("/signin", signin);

module.exports = authRouter;
