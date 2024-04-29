const express = require("express");
const {
  getQuestions,
  checkAnswer,
} = require("../controllers/qustionController");
const userRouter = express.Router();

userRouter.post("/check-answer", checkAnswer);
userRouter.get("/qustions", getQuestions);

module.exports = {
  userRouter,
};
