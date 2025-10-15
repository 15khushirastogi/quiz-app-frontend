import React, { useState } from 'react';
import './App.css';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ReportPage from './components/ReportPage';

function App() {
  // Application state management
  const [currentPage, setCurrentPage] = useState('start'); // 'start', 'quiz', 'report'
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  // Handle starting the quiz
  const handleStartQuiz = (userEmail, fetchedQuestions) => {
    setEmail(userEmail);
    setQuestions(fetchedQuestions);
    setCurrentPage('quiz');
  };

  // Handle quiz submission
  const handleSubmitQuiz = (answers) => {
    setUserAnswers(answers);
    setCurrentPage('report');
  };

  // Handle restarting the quiz
  const handleRestart = () => {
    setCurrentPage('start');
    setEmail('');
    setQuestions([]);
    setUserAnswers({});
  };

  return (
    <div className="App">
      {currentPage === 'start' && (
        <StartPage onStartQuiz={handleStartQuiz} />
      )}
      {currentPage === 'quiz' && (
        <QuizPage 
          questions={questions} 
          onSubmit={handleSubmitQuiz} 
        />
      )}
      {currentPage === 'report' && (
        <ReportPage 
          questions={questions} 
          userAnswers={userAnswers}
          email={email}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
