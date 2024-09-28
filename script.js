const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartButton = document.querySelector('#restartButton');
const newGameButton = document.querySelector('#newGameButton');
const exitButton = document.querySelector('#exitButton');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', newGame);
exitButton.addEventListener('click', exitGame);

function handleCellClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    highlightWinningCombination();
    autoRestart();
    return;
  }

  if (gameBoard.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    autoRestart();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameBoard[index] === currentPlayer;
    });
  });
}

function highlightWinningCombination() {
  winningCombinations.forEach(combination => {
    if (combination.every(index => gameBoard[index] === currentPlayer)) {
      combination.forEach(index => cells[index].classList.add('win'));
    }
  });
}

function autoRestart() {
  setTimeout(() => {
    restartGame();
    statusText.textContent = `It's ${currentPlayer}'s turn`;
  }, 3000); // Automatically restarts after 3 seconds
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  currentPlayer = 'X';
  gameActive = true;
}

function newGame() {
  restartGame();
  statusText.textContent = "New game started! It's X's turn";
}

function exitGame() {
  statusText.textContent = "Exiting the game...";
  setTimeout(() => {
    window.close();
  }, 1000);
}
