import React, { useState } from "react";
import axios from "axios";

const StartPage = ({ onStartQuiz }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // NEW BACKEND URL - MAKE SURE THIS IS CORRECT
  const API_URL =
    "https://quiz-ixi9yqjic-khushi-rastogis-projects-5e58af8c.vercel.app";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStart = async () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("Calling API:", `${API_URL}/api/questions`); // Debug log
      const response = await axios.get(`${API_URL}/api/questions`);

      if (response.data.results && response.data.results.length === 15) {
        const processedQuestions = response.data.results.map((q) => {
          const allChoices = [...q.incorrect_answers, q.correct_answer];
          const shuffledChoices = allChoices.sort(() => Math.random() - 0.5);

          return {
            ...q,
            choices: shuffledChoices,
          };
        });

        onStartQuiz(email, processedQuestions);
      } else {
        setError("Failed to load quiz questions. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container start-page">
      <h1>🎯 Quiz Application</h1>
      <p>
        Welcome to the quiz! You'll have <strong>30 minutes</strong> to answer{" "}
        <strong>15 questions</strong>.
      </p>
      <p>
        Navigate between questions, review your answers, and submit when ready.
        The quiz will auto-submit when the timer reaches zero.
      </p>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleStart} disabled={loading}>
        {loading ? "Loading Questions..." : "Start Quiz"}
      </button>
      {error && <div className="error-message">{error}</div>}
      {loading && (
        <div className="loading-message">
          Fetching questions from OpenTDB...
        </div>
      )}
    </div>
  );
};

export default StartPage;
