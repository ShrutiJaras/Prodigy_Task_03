// app.js
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Handle cell click event
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    
    // If cell is already clicked or game is over, do nothing
    if (gameBoard[index] !== '' || !gameActive) return;

    // Mark the cell with the current player's symbol
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;  // This line adds X or O to the cell

    // Add class to style the X or O
    cell.classList.add(currentPlayer.toLowerCase());

    // Check for a winner
    checkWinner();
    switchPlayer();
  });
});

// Switch player turns
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  gameStatus.classList.remove('winner', 'draw');
}

// Check for a winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameStatus.textContent = `Player ${currentPlayer} wins!`;
      gameStatus.classList.add('winner'); // Add winner class
      gameActive = false;
      return;
    }
  });

  if (!gameBoard.includes('')) {
    gameStatus.textContent = 'It\'s a draw!';
    gameStatus.classList.add('draw'); // Add draw class
    gameActive = false;
  }
}

// Restart the game
restartButton.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  gameStatus.classList.remove('winner', 'draw');
  cells.forEach(cell => {
    cell.textContent = '';  // Clear the text content
    cell.classList.remove('x', 'o');
    cell.style.backgroundColor = '#e0e0e0'; // Reset background color
  });
});
