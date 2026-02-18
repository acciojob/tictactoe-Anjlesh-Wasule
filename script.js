const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const game = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = Array(9).fill(null);
let gameOver = false;

// Winning combinations
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Start game
submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) return;

  currentPlayer = player1;
  currentSymbol = "x";

  playerForm.classList.add("hidden");
  game.classList.remove("hidden");
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (board[index] || gameOver) return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    // Switch player
    if (currentSymbol === "x") {
      currentSymbol = "o";
      currentPlayer = player2;
    } else {
      currentSymbol = "x";
      currentPlayer = player1;
    }

    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

// Check winner
function checkWin() {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === currentSymbol)
  );
}
