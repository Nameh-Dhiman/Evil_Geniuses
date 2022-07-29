const { Router } = require("express");
const { postingLoan, isTakenLoan } = require("../Controllers/loan");

const loanRouter = Router();

loanRouter.post("/approve", postingLoan);
loanRouter.get("/istaken/:student_id", isTakenLoan);

module.exports = loanRouter;
