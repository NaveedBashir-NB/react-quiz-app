import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/QuizStyle.css";
import correctIcon from "../assets/correct.png";
import wrongIcon from "../assets/wrong.png";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score = 0, total = 0, answers = [], quizData = [] } = location.state || {};

  if (!quizData.length) {
    return (
      <div className="container">
        <div className="quiz-card result-card">
          <h2>No quiz data found 😢</h2>
          <button className="nav-btn" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="quiz-card result-card">
        <h1>🎉 Quiz Completed!</h1>
        <p className="score">
          You scored <b>{score}</b> out of <b>{total}</b>
        </p>

        <div className="result-summary">
          <h2>Result Summary</h2>
          <ul>
            {quizData.map((q, index) => {
              const isCorrect = answers[index] === q.answer;
              const selectedAnswer = answers[index] || "Not Answered";
              return (
                <li
                  key={index}
                  className={isCorrect ? "correct" : "incorrect"}
                >
                  <span className="qnum">Q{index + 1}.</span>
                  <span className="user-answer">
                    {selectedAnswer}
                  </span>
                  <span className="correct-answer">
                    Correct Answer: {q.answer}
                  </span>
                  <img
                    src={isCorrect ? correctIcon : wrongIcon}
                    alt={isCorrect ? "Correct" : "Wrong"}
                    className="result-icon"
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <button className="nav-btn" onClick={() => navigate("/")}>
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
