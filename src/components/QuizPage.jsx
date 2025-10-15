import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import QuestionNav from "./QuestionNav";

const QuizPage = ({ questions, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));
  const [timeUp, setTimeUp] = useState(false);

  // Decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    });
  };

  // Navigate to specific question
  const goToQuestion = (index) => {
    setCurrentQuestion(index);
    setVisitedQuestions(new Set([...visitedQuestions, index]));
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      goToQuestion(currentQuestion - 1);
    }
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      goToQuestion(currentQuestion + 1);
    }
  };

  // Handle quiz submission
  const handleSubmit = () => {
    const confirmSubmit = window.confirm(
      `You have answered ${Object.keys(answers).length} out of ${
        questions.length
      } questions. Do you want to submit?`
    );
    if (confirmSubmit) {
      onSubmit(answers);
    }
  };

  // Auto-submit when time is up
  useEffect(() => {
    if (timeUp) {
      alert("Time is up! Your quiz will be submitted automatically.");
      onSubmit(answers);
    }
  }, [timeUp]);

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="container quiz-page">
      <div className="quiz-header">
        <h1 className="quiz-title">Quiz Application</h1>
        <Timer initialTime={1800} onTimeUp={() => setTimeUp(true)} />
      </div>

      <div className="quiz-content">
        <div className="question-section">
          <div className="question-card">
            <div className="question-number">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="question-text">{decodeHTML(currentQ.question)}</div>
            <div className="options">
              {currentQ.choices.map((choice, index) => (
                <div
                  key={index}
                  className={`option ${
                    selectedAnswer === choice ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerSelect(choice)}
                >
                  {decodeHTML(choice)}
                </div>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            <button
              className="nav-button prev-button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button className="nav-button next-button" onClick={handleNext}>
                Next →
              </button>
            ) : (
              <button
                className="nav-button submit-button"
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>

        <QuestionNav
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          answers={answers}
          visitedQuestions={visitedQuestions}
          onQuestionClick={goToQuestion}
        />
      </div>
    </div>
  );
};

export default QuizPage;
