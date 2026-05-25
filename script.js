const cells = Array.from(document.querySelectorAll(".cell"));
const currentPlayerLabel = document.getElementById("currentPlayer");
const gameStatusLabel = document.getElementById("gameStatus");
const restartBtn = document.getElementById("restartBtn");

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let boardState = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function updateStatus() {
  currentPlayerLabel.textContent = `Player ${currentPlayer}`;
}

function getWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return pattern;
    }
  }

  return null;
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (boardState[index] || gameOver) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  const winningPattern = getWinner();
  if (winningPattern) {
    gameOver = true;
    gameStatusLabel.textContent = `Player ${currentPlayer} wins`;
    currentPlayerLabel.textContent = `Player ${currentPlayer}`;
    winningPattern.forEach((winningIndex) => {
      cells[winningIndex].classList.add("winning");
    });
    cells.forEach((button) => {
      button.disabled = true;
    });
    return;
  }

  const isDraw = boardState.every((value) => value !== "");
  if (isDraw) {
    gameOver = true;
    gameStatusLabel.textContent = "Draw game";
    currentPlayerLabel.textContent = "No active turn";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
  gameStatusLabel.textContent = "In progress";
}

function resetGame() {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  gameStatusLabel.textContent = "In progress";
  updateStatus();

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o", "winning");
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", resetGame);

updateStatus();
