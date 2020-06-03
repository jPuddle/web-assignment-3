import "./styles.css";

const board_size = 5;
let board_state = [];
let activePlayer = 0;
let gameRunning = false;
const symbols = ["x", "o"];

if (document.readyState !== "loading") {
  // Document ready, executing
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    // Document was not ready, executing when loaded
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

function initializeCode() {
  console.log("Initializing");

  const board_display = document.getElementById("board");
  for (let y = 0; y < board_size; y++) {
    const row = document.createElement("TR");
    board_display.appendChild(row);
    board_state[y] = [];
    for (let x = 0; x < board_size; x++) {
      const cell = document.createElement("TD");
      row.appendChild(cell);
      board_state[y][x] = "-";
      cell.innerHTML = board_state[y][x];
      cell.addEventListener("mousedown", (event) => {
        cellClicked(cell, x, y);
        event.stopPropagation();
      });
    }
  }

  gameRunning = true;
  document.getElementById("titletext").innerHTML =
    symbols[activePlayer] + "'s turn.";
}

function cellClicked(button, x, y) {
  if (gameRunning && board_state[y][x] === "-") {
    button.innerHTML = board_state[y][x] = symbols[activePlayer];
    if (checkWinCondition(x, y)) {
      alert("Player " + (activePlayer + 1) + " wins!");
      gameRunning = false;
    } else {
      activePlayer = activePlayer === 1 ? 0 : 1;
      document.getElementById("titletext").innerHTML =
        symbols[activePlayer] + "'s turn.";
    }
  }
}

function checkWinCondition(x, y) {
  let count = 0;
  //Check horizontal
  for (let o = -2; o <= 2; o++) {
    if (x + o < 0 || x + o >= board_size) {
      continue;
    }
    if (board_state[y][x + o] === symbols[activePlayer]) {
      count++;
      if (count >= 3) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  count = 0;

  //Check vertical
  for (let o = -2; o <= 2; o++) {
    if (y + o < 0 || y + o >= board_size) {
      continue;
    }
    if (board_state[y + o][x] === symbols[activePlayer]) {
      count++;
      if (count >= 3) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  count = 0;

  //Check / diagonal
  for (let o = -2; o <= 2; o++) {
    if (x + o < 0 || x + o >= board_size || y + o < 0 || y + o >= board_size) {
      continue;
    }
    if (board_state[y + o][x + o] === symbols[activePlayer]) {
      count++;
      if (count >= 3) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  count = 0;

  //Check \ diagonal
  for (let o = -2; o <= 2; o++) {
    if (x + o < 0 || x + o >= board_size || y - o < 0 || y - o >= board_size) {
      continue;
    }
    if (board_state[y - o][x + o] === symbols[activePlayer]) {
      count++;
      if (count >= 3) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  return false;
}
