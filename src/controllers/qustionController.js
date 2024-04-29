const { json } = require("express");
const { quizQuestions } = require("../data/dummyData");

const getQuestions = (req, res) => {
  console.log("heloo")
  res.json(quizQuestions);
};

const checkAnswer = (req, res) => {
  const userAnswers = req.body;
  let totalScore = 0;
  let explanations = [];
  const WINNING_SCORE = quizQuestions.length * 10;

  Object.keys(userAnswers).forEach((questionId) => {
    const selectedOptionIndex = userAnswers[questionId];
    const question = quizQuestions.find((q) => q.id == questionId);

    if (!question) {
      explanations.push({ questionId, error: "Question not found" });
      return;
    }

    const isCorrect = question.correctOption === selectedOptionIndex;
    if (isCorrect) {
      totalScore += 10; 
    }
    explanations.push({ questionId, isCorrect, explanation: question.explanation });
  });

 
  if (totalScore === WINNING_SCORE) {
    res.json({ totalScore, explanations, message: "Congratulations! You have won!" });
  } else {
    res.status(400).json({ totalScore, explanations, message: "Sorry, you did not win. Try again!" });

  }
};



module.exports = {
  getQuestions,
  checkAnswer,
};
