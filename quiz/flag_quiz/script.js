/* =============================================
   COUNTRY FLAG QUIZ - JAVASCRIPT LOGIC
   ============================================= */

// Quiz Data with Live Flag Images
const quizData = [
  {
    id: 1,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/jp.png",
    options: ["Japan", "China"],
    correct: "Japan"
  },
  {
    id: 2,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/br.png",
    options: ["Brazil", "Mexico"],
    correct: "Brazil"
  },
  {
    id: 3,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/fr.png",
    options: ["France", "Netherlands"],
    correct: "France"
  },
  {
    id: 4,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/de.png",
    options: ["Germany", "Poland"],
    correct: "Germany"
  },
  {
    id: 5,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/it.png",
    options: ["Italy", "Hungary"],
    correct: "Italy"
  },
  {
    id: 6,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/us.png",
    options: ["United States", "United Kingdom"],
    correct: "United States"
  },
  {
    id: 7,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/ca.png",
    options: ["Canada", "Denmark"],
    correct: "Canada"
  },
  {
    id: 8,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/gb.png",
    options: ["United Kingdom", "Australia"],
    correct: "United Kingdom"
  },
  {
    id: 9,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/es.png",
    options: ["Spain", "Portugal"],
    correct: "Spain"
  },
  {
    id: 10,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/pt.png",
    options: ["Portugal", "Spain"],
    correct: "Portugal"
  },
  {
    id: 11,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/in.png",
    options: ["India", "Indonesia"],
    correct: "India"
  },
  {
    id: 12,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/au.png",
    options: ["Australia", "New Zealand"],
    correct: "Australia"
  },
  {
    id: 13,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/mx.png",
    options: ["Mexico", "Venezuela"],
    correct: "Mexico"
  },
  {
    id: 14,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/kr.png",
    options: ["South Korea", "North Korea"],
    correct: "South Korea"
  },
  {
    id: 15,
    question: "Which country does this flag belong to?",
    flag: "https://flagcdn.com/w320/th.png",
    options: ["Thailand", "Vietnam"],
    correct: "Thailand"
  }
];

// Quiz State
let currentQuestion = 0;
let selectedAnswer = null;
let isAnswered = false;

// Initialize Quiz
document.addEventListener('DOMContentLoaded', function() {
  initializeQuiz();
});

function initializeQuiz() {
  const currentPage = parseInt(window.location.pathname.match(/quiz(\d+)/)[1]) - 1;
  currentQuestion = currentPage;
  loadQuestion();
  setupEventListeners();
  updateNavigationButtons();
}

function loadQuestion() {
  const quiz = quizData[currentQuestion];
  
  // Update progress
  updateProgress();
  
  // Load question content
  const questionElement = document.querySelector('.quiz-title');
  const flagElement = document.querySelector('.flag-image');
  const optionsContainer = document.querySelector('.options-container');
  const feedbackElement = document.querySelector('.feedback');
  
  if (questionElement) {
    questionElement.textContent = quiz.question;
  }
  
  if (flagElement) {
    flagElement.innerHTML = `<img src="${quiz.flag}" alt="Flag of ${quiz.options[0]}" style="max-width: 100%; height: auto;">`;
  }
  
  // Clear previous options
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    
    // Shuffle options
    const shuffledOptions = [...quiz.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.textContent = option;
      button.onclick = () => selectAnswer(option, button);
      optionsContainer.appendChild(button);
    });
  }
  
  if (feedbackElement) {
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
  }
  
  // Reset state
  selectedAnswer = null;
  isAnswered = false;
  updateNavigationButtons();
}

function selectAnswer(answer, buttonElement) {
  if (isAnswered) return;
  
  const quiz = quizData[currentQuestion];
  selectedAnswer = answer;
  isAnswered = true;
  
  const allButtons = document.querySelectorAll('.option-button');
  const feedbackElement = document.querySelector('.feedback');
  
  allButtons.forEach(btn => btn.disabled = true);
  
  if (answer === quiz.correct) {
    // Correct Answer
    buttonElement.classList.add('correct');
    if (feedbackElement) {
      feedbackElement.textContent = '✓ Correct! Great job!';
      feedbackElement.className = 'feedback success';
    }
    
    // Store score
    updateScore(true);
  } else {
    // Incorrect Answer
    buttonElement.classList.add('incorrect');
    
    // Highlight correct answer
    allButtons.forEach(btn => {
      if (btn.textContent === quiz.correct) {
        btn.classList.add('correct');
      }
    });
    
    if (feedbackElement) {
      feedbackElement.textContent = '✗ Incorrect! The correct answer is ' + quiz.correct;
      feedbackElement.className = 'feedback error';
    }
    
    // Store score
    updateScore(false);
  }
  
  updateNavigationButtons();
}

function updateProgress() {
  const progressText = document.querySelector('.progress-text');
  const progressFill = document.querySelector('.progress-fill');
  
  if (progressText) {
    progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  }
  
  if (progressFill) {
    const percentage = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = percentage + '%';
  }
}

function updateNavigationButtons() {
  const prevButton = document.querySelector('.nav-button.prev');
  const nextButton = document.querySelector('.nav-button.next');
  
  // Update Previous button
  if (prevButton) {
    prevButton.disabled = currentQuestion === 0;
  }
  
  // Update Next button
  if (nextButton) {
    nextButton.disabled = !isAnswered;
  }
}

function setupEventListeners() {
  const prevButton = document.querySelector('.nav-button.prev');
  const nextButton = document.querySelector('.nav-button.next');
  
  if (prevButton) {
    prevButton.onclick = (e) => {
      e.preventDefault();
      navigateToPrevious();
    };
  }
  
  if (nextButton) {
    nextButton.onclick = (e) => {
      e.preventDefault();
      navigateToNext();
    };
  }
}

function navigateToPrevious() {
  if (currentQuestion > 0) {
    const previousPage = currentQuestion;
    window.location.href = `quiz${previousPage}.html`;
  }
}

function navigateToNext() {
  if (currentQuestion < quizData.length - 1) {
    const nextPage = currentQuestion + 2;
    window.location.href = `quiz${nextPage}.html`;
  } else {
    // Navigate to results page
    window.location.href = 'results.html';
  }
}

// Score Management with LocalStorage
function updateScore(isCorrect) {
  let scores = getScores();
  scores[currentQuestion] = isCorrect ? 1 : 0;
  localStorage.setItem('quizScores', JSON.stringify(scores));
}

function getScores() {
  const stored = localStorage.getItem('quizScores');
  if (!stored) {
    return new Array(quizData.length).fill(null);
  }
  return JSON.parse(stored);
}

function getScore() {
  const scores = getScores();
  return scores.filter(score => score === 1).length;
}

function resetScore() {
  localStorage.removeItem('quizScores');
}

// Results Page Logic
function displayResults() {
  const totalScore = getScore();
  const totalQuestions = quizData.length;
  const percentage = Math.round((totalScore / totalQuestions) * 100);
  
  const scoreDisplay = document.querySelector('.score-display');
  const scoreText = document.querySelector('.score-text');
  const scoreMessage = document.querySelector('.score-message');
  const restartButton = document.querySelector('.restart-button');
  
  if (scoreDisplay) {
    scoreDisplay.textContent = totalScore + ' / ' + totalQuestions;
  }
  
  if (scoreText) {
    scoreText.textContent = percentage + '% Correct';
  }
  
  if (scoreMessage) {
    if (percentage === 100) {
      scoreMessage.textContent = '🎉 Perfect Score! You are a flag expert!';
    } else if (percentage >= 80) {
      scoreMessage.textContent = '🌟 Excellent! You did great!';
    } else if (percentage >= 60) {
      scoreMessage.textContent = '👍 Good job! Keep learning!';
    } else if (percentage >= 40) {
      scoreMessage.textContent = '📚 You can do better! Study some flags and try again!';
    } else {
      scoreMessage.textContent = '💪 Keep practicing! You will improve!';
    }
  }
  
  if (restartButton) {
    restartButton.onclick = () => {
      resetScore();
      window.location.href = 'quiz1.html';
    };
  }
}

// Check if on results page and initialize
if (window.location.pathname.includes('results')) {
  document.addEventListener('DOMContentLoaded', displayResults);
}
