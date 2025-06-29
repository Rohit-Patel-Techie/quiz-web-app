import React, { useState } from 'react';
import './App.css';

function App() {
  const Questions = [
    {
      question: "What is a unit of Electric Field?",
      options: ['Tesla', 'Newton', "Newton/Coulomb", "Coulomb"],
      answer: 'Newton/Coulomb'
    },
    {
      question: "What is the SI unit of Electric Charge?",
      options: ['Ampere', 'Coulomb', "Volt", "Ohm"],
      answer: 'Coulomb'
    },
    {
      question: "What is the SI unit of Electric Current?",
      options: ['Ampere', 'Coulomb', "Volt", "Ohm"],
      answer: 'Ampere'
    },
    {
      question: "What is the SI unit of Voltage?",
      options: ['Ampere', 'Coulomb', "Volt", "Ohm"],
      answer: 'Volt'
    },
    {
      question: "What is the SI unit of Resistance?",
      options: ['Ampere', 'Coulomb', "Volt", "Ohm"],
      answer: 'Ohm'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (option) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption === Questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setAnswered(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswered(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? '#f8f9fa' : '#282c34';
  };
  const getOptionClass = (option) => {
    if (!answered) return 'option-button';
    if (option === Questions[currentQuestion].answer) return 'option-button correct';
    if (option === selectedOption && option !== Questions[currentQuestion].answer) return 'option-button wrong';
    return 'option-button';
  };

  return (
    <>
      <header className="app-header">
        <h1>Physics Quiz</h1>
      </header>
      <div className="quiz-container">
        <div className={`quiz-app ${darkMode ? 'dark' : 'light'}`}>
          <div className="header">
            <p className="quiz-title">Quiz Web App </p>
            <button className="mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          {showScore ? (
            <div className="score-section">
              <h2>Your Score: {score} out of {Questions.length}</h2>
              <button className="reset-button" onClick={resetQuiz}>
                Restart Quiz
              </button>
            </div>
          ) : (
            <div className="question-section">
              <div className="question-info">
                <span>Question {currentQuestion + 1}/{Questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <p className="question">{Questions[currentQuestion].question}</p>
              <div className="options">
                {Questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={getOptionClass(option)}
                    onClick={() => handleOptionClick(option)}
                    disabled={answered}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                className="next-button"
                onClick={handleNextQuestion}
                disabled={!selectedOption}
              >
                {currentQuestion === Questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
        </div>
        <footer className="app-footer">
        <h1>Created by Rohit Patel</h1>
      </footer>
      </>

      );
}

      export default App;
