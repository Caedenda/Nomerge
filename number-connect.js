const gridContainer = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset-button');
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-game');
const usernameInput = document.getElementById('username');
const leaderboardList = document.getElementById('leaderboard');

let grid = [];
let score = 0;
let currentNumber = 1;
let timer;
let gameOver = false;
let startTime;
let username = '';

// Initialize the game
function init() {
    grid = generateRandomGrid();
    currentNumber = 1;
    score = 0;
    gameOver = false;
    scoreDisplay.textContent = score;
    message.textContent = '';
    clearInterval(timer);
    startTime = Date.now();
    startTimer();
    renderGrid();
}

// Generate a 5x5 grid with random numbers (1-25)
function generateRandomGrid() {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5); // Shuffle numbers
    return Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => numbers[row * 5 + col])
    );
}

// Render the grid
function renderGrid() {
    gridContainer.innerHTML = '';
    grid.forEach((row, rowIndex) => {
        row.forEach((num, colIndex) => {
            const cell = document.createElement('div');
            cell.textContent = num;
            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;
            cell.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
            gridContainer.appendChild(cell);
        });
    });
}

// Handle cell clicks
function handleCellClick(row, col) {
    if (gameOver) return;

    const cell = grid[row][col];
    if (cell === currentNumber) {
        const cellElement = document.querySelector(`.grid div[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('selected');
        if (currentNumber === 1) {
            cellElement.classList.add('connected');
        } else {
            const prevCell = document.querySelector('.grid div.connected:last-child');
            if (prevCell) {
                prevCell.classList.remove('selected');
                cellElement.classList.add('connected');
            }
        }
        currentNumber++;
        score++;
        scoreDisplay.textContent = score;
        
        if (currentNumber > 25) {
            const endTime = Date.now();
            const timeTaken = ((endTime - startTime) / 1000).toFixed(1);
            message.textContent = `Congratulations! You won in ${timeTaken} seconds!`;
            clearInterval(timer);
            gameOver = true;
            updateLeaderboard(username, timeTaken);
        }
    } else {
        message.textContent = 'Wrong number! Try again.';
    }
}

// Format time for display
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Start the timer
function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - startTime) / 1000;
        timerDisplay.textContent = formatTime(elapsedSeconds);
    }, 100);
}

// Update leaderboard
function updateLeaderboard(username, time) {
    let leaderboard = JSON.parse(localStorage.getItem('numberConnectLeaderboard') || '[]');
    leaderboard.push({ username, time: parseFloat(time) });
    leaderboard.sort((a, b) => a.time - b.time);
    leaderboard = leaderboard.slice(0, 10); // Keep only top 10
    localStorage.setItem('numberConnectLeaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

// Display leaderboard
function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('numberConnectLeaderboard') || '[]');
    leaderboardList.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="player-name">${index + 1}. ${entry.username}</span>
            <span class="player-time">${entry.time}s</span>
        `;
        leaderboardList.appendChild(li);
    });
}

// Start game button click handler
startButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        welcomeScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        init();
    } else {
        message.textContent = 'Please enter a username to start!';
    }
});

// Reset game button click handler
resetButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    usernameInput.value = username;
    clearInterval(timer);
    message.textContent = '';
});

// Load and display leaderboard on page load
displayLeaderboard();