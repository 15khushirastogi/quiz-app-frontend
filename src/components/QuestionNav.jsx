import React from "react";

const QuestionNav = ({
  totalQuestions,
  currentQuestion,
  answers,
  visitedQuestions,
  onQuestionClick,
}) => {
  // Determine question status
  const getQuestionStatus = (index) => {
    if (index === currentQuestion) return "current";
    if (answers[index] !== undefined) return "attempted";
    if (visitedQuestions.has(index)) return "visited";
    return "not-visited";
  };

  return (
    <div className="question-nav">
      <h3>Questions Overview</h3>
      <div className="question-grid">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <div
            key={index}
            className={`question-nav-item ${getQuestionStatus(index)}`}
            onClick={() => onQuestionClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-box current"></div>
          <span>Current</span>
        </div>
        <div className="legend-item">
          <div className="legend-box attempted"></div>
          <span>Attempted</span>
        </div>
        <div className="legend-item">
          <div className="legend-box visited"></div>
          <span>Visited</span>
        </div>
        <div className="legend-item">
          <div className="legend-box not-visited"></div>
          <span>Not Visited</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNav;
