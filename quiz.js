const questions = {
  history: [
    {
        question: "Who was the first president of the United States?",
        choices: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
        correct: 0 // George Washington is the first choice (index 0)
    },
    {
        question: "In which year did World War II end?",
        choices: ["1939", "1941", "1945", "1950"],
        correct: 2 // 1945 is the third choice (index 2)
    },
    {
        question: "Which civilization built the pyramids?",
        choices: ["Roman", "Greek", "Egyptian", "Mayan"],
        correct: 2 // Egyptian is the third choice (index 2)
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        choices: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        correct: 0 // Shakespeare is the first choice (index 0)
    },
    {
        question: "Which event started World War I?",
        choices: ["Assassination of Archduke Ferdinand", "Battle of the Somme", "Treaty of Versailles", "D-Day Landing"],
        correct: 0 // Assassination of Archduke Ferdinand is the first choice (index 0)
    },
    {
        question: "What year did the Titanic sink?",
        choices: ["1912", "1905", "1898", "1920"],
        correct: 0 // 1912 is the first choice (index 0)
    },
    {
        question: "Who was known as the Iron Lady?",
        choices: ["Margaret Thatcher", "Angela Merkel", "Indira Gandhi", "Golda Meir"],
        correct: 0 // Margaret Thatcher is the first choice (index 0)
    },
    {
        question: "What was the main cause of the Cold War?",
        choices: ["Ideological differences", "Territorial disputes", "Economic competition", "Military alliances"],
        correct: 0 // Ideological differences is the first choice (index 0)
    },
    {
        question: "Which empire was known for its road system?",
        choices: ["Roman Empire", "Ottoman Empire", "Mongol Empire", "British Empire"],
        correct: 0 // Roman Empire is the first choice (index 0)
    },
    {
        question: "Who discovered America?",
        choices: ["Christopher Columbus", "Leif Erikson", "Ferdinand Magellan", "Marco Polo"],
        correct: 0 // Christopher Columbus is the first choice (index 0)
    }
],
    technology: [
      {
        question: "What does CPU stand for?",
        choices: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
        correct: 0 // Central Processing Unit is the first choice (index 0)
    },
    {
        question: "Which company developed the iPhone?",
        choices: ["Samsung", "Apple", "Nokia", "Microsoft"],
        correct: 1 // Apple is the second choice (index 1)
    },
    {
        question: "What is the main function of RAM?",
        choices: ["Store data permanently", "Process data", "Store data temporarily", "Control hardware"],
        correct: 2 // Store data temporarily is the third choice (index 2)
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hypertext Markup Language", "Hightext Machine Language", "Hyperlink and Text Markup Language", "Hypertext Multi Language"],
        correct: 0 // Hypertext Markup Language is the first choice (index 0)
    },
    {
        question: "Which programming language is known for web development?",
        choices: ["Python", "Java", "JavaScript", "C++"],
        correct: 2 // JavaScript is the third choice (index 2)
    },
    {
        question: "What is the primary purpose of an operating system?",
        choices: ["Manage hardware resources", "Run applications", "Provide security", "All of the above"],
        correct: 3 // All of the above is the fourth choice (index 3)
    },
    {
        question: "Which of the following is a search engine?",
        choices: ["Google", "Facebook", "Twitter", "Instagram"],
        correct: 0 // Google is the first choice (index 0)
    },
    {
        question: "What does VPN stand for?",
        choices: ["Virtual Private Network", "Virtual Public Network", "Variable Private Network", "Virtual Protected Network"],
        correct: 0 // Virtual Private Network is the first choice (index 0)
    },
    {
        question: "Which device is used to connect to the internet?",
        choices: ["Router", "Printer", "Scanner", "Monitor"],
        correct: 0 // Router is the first choice (index 0)
    },
    {
        question: "What is the main purpose of a firewall?",
        choices: ["To protect against unauthorized access", "To speed up internet connection", "To store data", "To manage network traffic"],
        correct: 0 // To protect against unauthorized access is the first choice (index 0)
    }
],
    englishVocabulary: [
      {
        question: "What does 'benevolent' mean?",
        choices: ["Kind", "Evil", "Indifferent", "Angry"],
        correct: 0 // Kind is the first choice (index 0)
    },
    {
        question: "What is the synonym of 'happy'?",
        choices: ["Sad", "Joyful", "Angry", "Bored"],
        correct: 1 // Joyful is the second choice (index 1)
    },
    {
        question: "What does 'meticulous' mean?",
        choices: ["Careless", "Detailed", "Quick", "Lazy"],
        correct: 1 // Detailed is the second choice (index 1)
    },
    {
        question: "What is the antonym of 'difficult'?",
        choices: ["Easy", "Hard", "Complex", "Challenging"],
        correct: 0 // Easy is the first choice (index 0)
    },
    {
        question: "What does 'ubiquitous' mean?",
        choices: ["Rare", "Everywhere", "Uncommon", "Hidden"],
        correct: 1 // Everywhere is the second choice (index 1)
    },
    {
        question: "What is the meaning of 'ambiguous'?",
        choices: ["Clear", "Unclear", "Simple", "Obvious"],
        correct: 1 // Unclear is the second choice (index 1)
    },
    {
        question: "What does 'candid' mean?",
        choices: ["Deceitful", "Honest", "Reserved", "Shy"],
        correct: 1 // Honest is the second choice (index 1)
    },
    {
        question: "What is the synonym of 'diligent'?",
        choices: ["Lazy", "Hardworking", "Careless", "Indifferent"],
        correct: 1 // Hardworking is the second choice (index 1)
    },
    {
        question: "What does 'ephemeral' mean?",
        choices: ["Permanent", "Short-lived", "Long-lasting", "Enduring"],
        correct: 1 // Short-lived is the second choice (index 1)
    },
    {
        question: "What is the antonym of 'optimistic'?",
        choices: ["Pessimistic", "Hopeful", "Positive", "Cheerful"],
        correct: 0 // Pessimistic is the first choice (index 0)
    }
]
  };
  
  let currentTopic = '';
  let currentQuestionIndex = 0;
  let score = 0;
  let timer; // Variable to hold the timer
  let timeLeft = 10; // Time left for each question
  let hintsRemaining = 3; // Number of hints available per quiz
  let username = ''; // Variable to store the current username
  let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || {
    technology: [],
    englishVocabulary: [],
    history: []
  };
  
  // Start the quiz for the selected topic
  function startQuiz(topic) {
    console.log(`Starting quiz for topic: ${topic}`); // Debugging log
    currentTopic = topic;
    currentQuestionIndex = 0;
    score = 0;
    hintsRemaining = 3; // Reset hints when starting new quiz
    document.getElementById("hints-remaining").textContent = `Hints Remaining: ${hintsRemaining}`; // Update hints display
    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("quiz-topic").textContent = `${topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz`;
    loadQuestion();
  }
  
  // Load the current question
  function loadQuestion() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 10; // Reset time left
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    document.getElementById("quiz").style.opacity = '1'; // Ensure opacity is reset
  
    const questionData = questions[currentTopic][currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = '';
    questionData.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.onclick = () => checkAnswer(index);
      choicesContainer.appendChild(button);
    });
    document.getElementById("remaining").textContent = questions[currentTopic].length - currentQuestionIndex;
    document.getElementById("hint").textContent = ''; // Clear any previous hint
  
    // Start the timer
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer(-1); // Pass -1 to indicate time is up
      }
    }, 1000);
  }
  
  // Check the selected answer
  function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const correctAnswerIndex = questions[currentTopic][currentQuestionIndex].correct;
    const resultElement = document.getElementById("result");
    const quizSection = document.getElementById("quiz");

    if (selectedIndex === correctAnswerIndex) {
      score++;
      resultElement.textContent = "Correct!";
      resultElement.style.color = "green";
    } else if (selectedIndex === -1) {
      resultElement.textContent = `Time's up! Answer: ${questions[currentTopic][currentQuestionIndex].choices[correctAnswerIndex]}`;
      resultElement.style.color = "red";
    } else {
      resultElement.textContent = `Wrong! Answer: ${questions[currentTopic][currentQuestionIndex].choices[correctAnswerIndex]}`;
      resultElement.style.color = "red";
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentTopic].length) {
      // Super quick fade
      quizSection.style.opacity = '0.8';
      quizSection.style.transition = 'opacity 0.1s ease';
      
      setTimeout(() => {
        loadQuestion();
        quizSection.style.opacity = '1';
      }, 100); // Ultra fast - just 0.1 seconds
    } else {
      endQuiz();
    }
  }
  
  // Show a hint for the current question
  function showHint() {
    if (hintsRemaining <= 0) {
      document.getElementById("hint").textContent = "No hints remaining!";
      return;
    }

    const questionData = questions[currentTopic][currentQuestionIndex];
    const hintElement = document.getElementById("hint");
    const choiceButtons = document.querySelectorAll('#choices button');
  
    // Get the correct answer index
    const correctAnswerIndex = questionData.correct;
  
    // Create an array of incorrect answer indices
    const incorrectIndices = questionData.choices.map((_, index) => index).filter(index => index !== correctAnswerIndex);
  
    // Randomly select 1-2 buttons to remove
    const numToRemove = Math.min(incorrectIndices.length - 1, 2); // Ensure at least one incorrect answer remains
    for (let i = 0; i < numToRemove; i++) {
      const randomIndex = Math.floor(Math.random() * incorrectIndices.length);
      const buttonToRemove = incorrectIndices[randomIndex];
      // Hide the button with fade out animation
      choiceButtons[buttonToRemove].style.transition = 'all 0.2s ease';
      choiceButtons[buttonToRemove].style.opacity = '0';
      choiceButtons[buttonToRemove].style.transform = 'scale(0)';
      choiceButtons[buttonToRemove].style.pointerEvents = 'none'; // Disable clicking
      incorrectIndices.splice(randomIndex, 1);
    }
  
    hintsRemaining--;
    document.getElementById("hints-remaining").textContent = `Hints Remaining: ${hintsRemaining}`;
    hintElement.textContent = "Hint: Some incorrect answers have been removed!";
  }
  
  // Skip the current question
  function skipQuestion() {
    clearInterval(timer);
    const correctAnswerIndex = questions[currentTopic][currentQuestionIndex].correct;
    const resultElement = document.getElementById("result");
    const quizSection = document.getElementById("quiz");
  
    // Quick flash of the correct answer
    resultElement.textContent = `Skipped! Answer: ${questions[currentTopic][currentQuestionIndex].choices[correctAnswerIndex]}`;
    resultElement.style.color = "red";
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentTopic].length) {
      // Super quick fade
      quizSection.style.opacity = '0.8';
      quizSection.style.transition = 'opacity 0.1s ease';
      
      // Almost instant transition
      setTimeout(() => {
        loadQuestion();
        quizSection.style.opacity = '1';
      }, 100); // Ultra fast - just 0.1 seconds
    } else {
      resultElement.textContent = `Quiz Over! You scored ${score} out of ${questions[currentTopic].length}.`;
    }
  }
  
  // Reset the quiz
  function resetQuiz() {
    clearInterval(timer); // Clear the timer when resetting the quiz
    currentQuestionIndex = 0;
    score = 0;
    hintsRemaining = 3; // Reset hints when resetting quiz
    document.getElementById("hints-remaining").textContent = `Hints Remaining: ${hintsRemaining}`; // Update hints display
    document.getElementById("result").textContent = '';
    document.getElementById("remaining").textContent = questions[currentTopic].length;
    document.getElementById("home").style.display = "block";
    document.getElementById("quiz").style.display = "none";
  }

  // Set username and start the game
  function setUsername() {
    const usernameInput = document.getElementById('username-input');
    username = usernameInput.value.trim();
    
    if (username) {
        document.getElementById('username-section').style.display = 'none';
        document.getElementById('home').style.display = 'block';
    } else {
        alert('Please enter a username to continue!');
    }
  }

  // Handle end of quiz and update leaderboard
  function endQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("leaderboard").style.display = "block";
    
    // Update leaderboard
    updateLeaderboard(username, score);
  }

  // Display the leaderboard
  function displayLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';
    
    const topicScores = leaderboard[currentTopic] || [];
    
    topicScores.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.username}</td>
            <td>${entry.score}</td>
            <td>${currentTopic}</td>
        `;
        leaderboardBody.appendChild(row);
    });
  }

  // Play again function
  function playAgain() {
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    score = 0;
    currentQuestionIndex = 0;
  }

  // Function to save leaderboard
  function saveLeaderboard() {
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
    // Also save to sessionStorage for redundancy
    sessionStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
  }

  // Function to update leaderboard
  function updateLeaderboard(username, score) {
    if (!leaderboard[currentTopic]) {
      leaderboard[currentTopic] = [];
    }

    // Add new score with timestamp
    leaderboard[currentTopic].push({
      username: username,
      score: score,
      timestamp: Date.now(),
      topic: currentTopic
    });

    // Sort by score (descending) and timestamp (ascending)
    leaderboard[currentTopic].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timestamp - b.timestamp;
    });

    // Keep only top 10 scores
    leaderboard[currentTopic] = leaderboard[currentTopic].slice(0, 10);

    // Save immediately
    saveLeaderboard();

    // Display updated leaderboard
    displayLeaderboard();
  }

  // Function to load leaderboard on page load
  function loadLeaderboard() {
    // Try to load from localStorage first
    const savedLeaderboard = localStorage.getItem('quizLeaderboard');
    if (savedLeaderboard) {
      leaderboard = JSON.parse(savedLeaderboard);
    } else {
      // If not in localStorage, try sessionStorage
      const sessionLeaderboard = sessionStorage.getItem('quizLeaderboard');
      if (sessionLeaderboard) {
        leaderboard = JSON.parse(sessionLeaderboard);
      }
    }
  }

  // Call loadLeaderboard when the page loads
  document.addEventListener('DOMContentLoaded', loadLeaderboard);