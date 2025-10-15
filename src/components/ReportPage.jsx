import React from "react";

const ReportPage = ({ questions, userAnswers, email, onRestart }) => {
  // Decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Calculate score
  let correctCount = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correct_answer) {
      correctCount++;
    }
  });

  const percentage = ((correctCount / questions.length) * 100).toFixed(1);

  return (
    <div className="container report-page">
      <h1>📊 Quiz Results</h1>

      <div className="score-summary">
        <h2>
          {correctCount} / {questions.length}
        </h2>
        <p>You scored {percentage}%</p>
        <p>Email: {email}</p>
      </div>

      <div className="answers-review">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.correct_answer;
          const wasAnswered = userAnswer !== undefined;

          return (
            <div
              key={index}
              className={`answer-card ${isCorrect ? "correct" : "incorrect"}`}
            >
              <h3>Question {index + 1}</h3>
              <p>
                <strong>{decodeHTML(question.question)}</strong>
              </p>

              <div style={{ marginTop: "15px" }}>
                <p className="answer-label">Your Answer:</p>
                {wasAnswered ? (
                  <div
                    className={`user-answer ${
                      isCorrect ? "correct-answer" : "wrong-answer"
                    }`}
                  >
                    {decodeHTML(userAnswer)} {isCorrect ? "✓" : "✗"}
                  </div>
                ) : (
                  <div className="user-answer wrong-answer">Not Answered ✗</div>
                )}
              </div>

              {!isCorrect && (
                <div style={{ marginTop: "10px" }}>
                  <p className="answer-label">Correct Answer:</p>
                  <div className="correct-answer-text">
                    {decodeHTML(question.correct_answer)} ✓
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="restart-button" onClick={onRestart}>
        Take Another Quiz
      </button>
    </div>
  );
};

export default ReportPage;
