import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/QuizStyle.css";
import { quizData } from "../Data/questions";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); 
  const navigate = useNavigate();

  const question = quizData[currentQuestion];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption || "Not Answered";
    setAnswers(newAnswers);

    let updatedScore = score;
    if (selectedOption === question.answer) {
      updatedScore += 1;
      setScore(updatedScore);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption("");
    } else {
      navigate("/result", {
        state: {
          score: updatedScore,
          total: quizData.length,
          answers: newAnswers,
          quizData,
        },
      });
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption("");
    }
  };

  return (
    <div className="container">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1>Quiz #1</h1>
        </div>

        <div className="quiz-content">
          <p className="qnum">
            <b>QUESTION - {currentQuestion + 1}</b>
          </p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
              }}
            ></div>
          </div>

          <p className="qtext">{question.question}</p>

          <ol type="A">
            {question.options.map((option, index) => (
              <li
                key={index}
                className={selectedOption === option ? "selected" : ""}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ol>

          <div className="btn-container">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="nav-btn"
            >
              Previous
            </button>
            <p className="q-count">
              Question {currentQuestion + 1} of {quizData.length}
            </p>
            <button onClick={handleNext} className="nav-btn">
              {currentQuestion === quizData.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
