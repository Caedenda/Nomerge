const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const highestScoreDisplay = document.getElementById('highest-score');
const resetButton = document.getElementById('reset');
const startGameButton = document.getElementById('start-game');
const usernameInput = document.getElementById('username');
const leaderboard = document.getElementById('leaderboard');
let score = 0;
let highestScore = 0;
let board = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
let currentNumber = null;
let username = '';
let isAnimating = false;

// Initialize the game
function init() {
    highestScore = localStorage.getItem('highestScore') || 0;
    highestScoreDisplay.textContent = highestScore;
    addNumber();
    renderBoard();
}

// Add a new number (2 or 4) to a random position at the top
function addNumber() {
    if (!currentNumber) {
        const randomCol = Math.floor(Math.random() * 5);
        currentNumber = {
            value: Math.random() < 0.9 ? 2 : 4,
            col: randomCol
        };
        renderBoard();
    }
}

// Render the board
function renderBoard() {
    grid.innerHTML = '';
    
    // Clear any existing current number
    const currentNumberContainer = document.querySelector('.current-number-container');
    currentNumberContainer.innerHTML = '';
    
    // Create grid cells
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.textContent = board[i][j] === 0 ? '' : board[i][j];
            cell.setAttribute('data-value', board[i][j]);
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            cell.classList.add('grid-cell');
            if (board[i][j] !== 0) {
                cell.classList.add('combine');
                setTimeout(() => cell.classList.remove('combine'), 300);
            }
            grid.appendChild(cell);
        }
    }
    
    // Add current number if it exists
    if (currentNumber) {
        const currentNumberElement = document.createElement('div');
        currentNumberElement.textContent = currentNumber.value;
        currentNumberElement.setAttribute('data-value', currentNumber.value);
        currentNumberElement.classList.add('current-number');
        
        // Calculate exact position to align with grid columns
        const cellWidth = 80; // Width of each cell
        const gap = 10; // Gap between cells
        const padding = 20; // Grid padding
        const position = padding + (currentNumber.col * (cellWidth + gap));
        
        currentNumberElement.style.left = `${position}px`;
        
        // Reset animation
        currentNumberElement.style.animation = 'none';
        currentNumberContainer.appendChild(currentNumberElement);
        
        // Force reflow and start animation
        void currentNumberElement.offsetWidth;
        currentNumberElement.style.animation = 'dropFromTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        currentNumberContainer.appendChild(currentNumberElement);
    }
}

// Find the lowest empty position in a column
function findLowestEmptyPosition(col) {
    for (let row = 4; row >= 0; row--) {
        if (board[row][col] === 0) {
            return row;
        }
    }
    return -1;
}

// Place the current number in the selected column
async function placeNumber(col) {
    if (isAnimating || !currentNumber) return;
    isAnimating = true;

    const row = findLowestEmptyPosition(col);
    if (row === -1) {
        isAnimating = false;
        return;
    }

    const currentNumberElement = document.querySelector('.current-number');
    if (currentNumberElement) {
        // Calculate drop distance based on target row
        const cellHeight = 80; // Height of each cell
        const gap = 10; // Gap between cells
        const padding = 20; // Grid padding
        const dropDistance = (row * (cellHeight + gap)) + padding;
        
        // Set the drop distance as a CSS variable
        currentNumberElement.style.setProperty('--drop-distance', `${dropDistance}px`);
        
        // Add falling class to trigger animation
        currentNumberElement.classList.add('falling');
        
        // Create impact cells
        const impactCells = [];
        for (let i = 0; i <= row; i++) {
            const cell = document.querySelector(`.grid div[data-row="${i}"][data-col="${col}"]`);
            if (cell) {
                impactCells.push(cell);
            }
        }
        
        // Create falling particles
        const particleCount = 12;
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 99;
                filter: blur(1px);
                opacity: 0.8;
            `;
            const angle = (i / particleCount) * Math.PI * 2;
            const speed = 3 + Math.random() * 3;
            const delay = Math.random() * 0.3;
            particle.style.left = `${currentNumberElement.offsetLeft + 40}px`;
            particle.style.top = `${currentNumberElement.offsetTop + dropDistance + 40}px`;
            
            // Create unique animation for each particle
            const style = document.createElement('style');
            style.textContent = `
                @keyframes particleFall${i} {
                    0% {
                        transform: translate(0, -${dropDistance}px) scale(1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(${Math.cos(angle) * 60 * speed}px, ${Math.sin(angle) * 60 * speed}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            particle.style.animation = `particleFall${i} 1.2s ease-out ${delay}s forwards`;
            document.querySelector('.grid-wrapper').appendChild(particle);
            particles.push(particle);
        }
        
        // Wait for animation to complete
        await new Promise(resolve => {
            currentNumberElement.addEventListener('animationend', () => {
                // Add ripple effect to impact cells
                impactCells.forEach((cell, index) => {
                    setTimeout(() => {
                        cell.style.animation = 'none';
                        void cell.offsetWidth;
                        cell.style.animation = `cellImpact 0.5s ease-out ${index * 0.1}s`;
                    }, 0);
                });
                
                currentNumberElement.remove();
                
                // Clean up particles after animation
                setTimeout(() => {
                    particles.forEach(p => p.remove());
                }, 1200);
                
                resolve();
            }, { once: true });
        });
        
        // Wait for impact animation
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    board[row][col] = currentNumber.value;
    currentNumber = null;
    
    await processMerges();
    isAnimating = false;
    
    if (!isGameOver()) {
        addNumber();
        renderBoard();
    } else {
        alert('Game Over! Final Score: ' + score);
        updateLeaderboard(username, score);
    }
}

// Process all possible merges
async function processMerges() {
    let merged;
    do {
        merged = false;
        // Check vertical merges
        for (let col = 0; col < 5; col++) {
            for (let row = 4; row > 0; row--) {
                if (board[row][col] !== 0 && board[row][col] === board[row-1][col]) {
                    const mergeValue = board[row][col] * 2;
                    const targetCell = document.querySelector(`.grid div[data-row="${row}"][data-col="${col}"]`);
                    const sourceCell = document.querySelector(`.grid div[data-row="${row-1}"][data-col="${col}"]`);
                    
                    if (targetCell && sourceCell) {
                        targetCell.classList.add('merging');
                        sourceCell.classList.add('merging');
                        await new Promise(resolve => setTimeout(resolve, 300));
                        targetCell.classList.remove('merging');
                        sourceCell.classList.remove('merging');
                    }
                    
                    board[row][col] = mergeValue;
                    updateScore(mergeValue);
                    board[row-1][col] = 0;
                    merged = true;
                }
            }
        }

        // Check horizontal merges
        for (let row = 4; row >= 0; row--) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] !== 0 && board[row][col] === board[row][col + 1]) {
                    const mergeValue = board[row][col] * 2;
                    const targetCell = document.querySelector(`.grid div[data-row="${row}"][data-col="${col}"]`);
                    const sourceCell = document.querySelector(`.grid div[data-row="${row}"][data-col="${col+1}"]`);
                    
                    if (targetCell && sourceCell) {
                        targetCell.classList.add('merging');
                        sourceCell.classList.add('merging');
                        await new Promise(resolve => setTimeout(resolve, 300));
                        targetCell.classList.remove('merging');
                        sourceCell.classList.remove('merging');
                    }
                    
                    board[row][col] = mergeValue;
                    updateScore(mergeValue);
                    board[row][col + 1] = 0;
                    merged = true;
                }
            }
        }
        
        // Apply gravity
        if (merged) {
            applyGravity();
            await new Promise(resolve => setTimeout(resolve, 300));
            renderBoard();
        }
    } while (merged);
}

// Apply gravity to make numbers fall
function applyGravity() {
    for (let col = 0; col < 5; col++) {
        let emptySpaces = 0;
        for (let row = 4; row >= 0; row--) {
            if (board[row][col] === 0) {
                emptySpaces++;
            } else if (emptySpaces > 0) {
                board[row + emptySpaces][col] = board[row][col];
                board[row][col] = 0;
            }
        }
    }
}

// Check if the game is over
function isGameOver() {
    // Check for empty spaces
    for (let i = 0; i < 5; i++) {
        if (board[0][i] === 0) return false;
    }
    
    // Check for possible merges
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === board[i][j+1]) return false;
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            if (board[i][j] === board[i+1][j]) return false;
        }
    }
    return true;
}

// Update the score
function updateScore(points) {
    score += points;
    scoreDisplay.textContent = score;
    if (score > highestScore) {
        highestScore = score;
        highestScoreDisplay.textContent = highestScore;
        localStorage.setItem('highestScore', highestScore);
    }
    highestScoreDisplay.textContent = highestScore;
}

// Reset the game
function resetGame() {
    board = Array(5).fill().map(() => Array(5).fill(0));
    score = 0;
    highestScore = 0;
    currentNumber = null;
    isAnimating = false;
    localStorage.removeItem('highestScore');
    updateScore(0);
    addNumber();
    renderBoard();
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (currentNumber && !isAnimating) {
        switch (e.key) {
            case 'ArrowLeft':
                if (currentNumber.col > 0) {
                    currentNumber.col--;
                    renderBoard();
                }
                break;
            case 'ArrowRight':
                if (currentNumber.col < 4) {
                    currentNumber.col++;
                    renderBoard();
                }
                break;
            case 'ArrowDown':
                placeNumber(currentNumber.col);
                break;
            case ' ':  // Spacebar
                placeNumber(currentNumber.col);
                break;
        }
    }
});

// Mouse/touch controls
grid.addEventListener('mousemove', (e) => {
    if (currentNumber && !isAnimating) {
        const rect = grid.getBoundingClientRect();
        const cellWidth = 80;
        const gap = 10;
        const padding = 20;
        
        // Calculate x position relative to grid
        const x = e.clientX - rect.left - padding;
        const totalCellWidth = cellWidth + gap;
        
        // Calculate column based on mouse position
        let col = Math.floor((x + gap / 2) / totalCellWidth);
        
        // Clamp column value between 0 and 4
        col = Math.max(0, Math.min(4, col));
        
        if (col !== currentNumber.col) {
            currentNumber.col = col;
            renderBoard();
        }
    }
});

grid.addEventListener('click', () => {
    if (currentNumber && !isAnimating) {
        placeNumber(currentNumber.col);
    }
});

// Start game button
startGameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        init();
        updateLeaderboard(username, score); // Show existing leaderboard
    } else {
        alert('Please enter a username to start playing!');
    }
});

// Reset button
resetButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the game? Your current score will be saved to the leaderboard.')) {
        updateLeaderboard(username, score);
        resetGame();
    }
});

// Update leaderboard
function updateLeaderboard(playerName, score) {
    // Get existing leaderboard data
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    // Add new score if greater than 0
    if (score > 0) {
        leaderboard.push({
            player: playerName,
            score: score
        });
    }
    
    // Sort by score (highest first)
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 10 scores
    leaderboard = leaderboard.slice(0, 10);
    
    // Save updated leaderboard
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    
    // Update display
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';
    
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="player-name">${entry.player}</div>
            <div class="score">${entry.score}</div>
        `;
        leaderboardElement.appendChild(li);
    });
}

// Add impact animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
@keyframes impact {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
}`;
document.head.appendChild(style);

// Start the game
init();