const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.getElementById('closeModal');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";  // X always starts
let movesHistory = [];

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Handle cell click
cells.forEach(cell => cell.addEventListener('click', () => {
  const index = cell.dataset.index;
  if (board[index] === "" && !checkWinner()) {
    makeMove(index, currentPlayer);
  }
}));

// Common move handler
function makeMove(index, symbol) {
  board[index] = symbol;
  cells[index].textContent = symbol;
  movesHistory.push(index);

  if (checkWinner()) {
    showModal(`${symbol} Wins!`);
    return;
  } else if (isBoardFull()) {
    showModal("It's a Draw!");
    return;
  }

  // Switch player
  currentPlayer = (symbol === "X") ? "O" : "X";
}

// Restart button
restartBtn.addEventListener('click', restartGame);

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  restartGame();
});

// Check for winner
function checkWinner() {
  return winningCombos.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Board full check
function isBoardFull() {
  return board.every(cell => cell !== "");
}

// Show modal
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = 'flex';
}

// Restart game
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  movesHistory = [];
  currentPlayer = "X";
  modal.style.display = 'none';
}
