import "./styles.css";

const BOARD_SIZE = 5;
const WINNING_SCORE = 5;
const TURN_TIMER = 100;
let board_state = [];
let activePlayer = 1;
const symbols = ["x", "o"];
let time = TURN_TIMER;
let timerInterval;
let gameRunning = false;

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
  for (let y = 0; y < BOARD_SIZE; y++) {
    const row = document.createElement("DIV");
    row.className = "row";
    board_display.appendChild(row);
    board_state[y] = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      const cell = document.createElement("DIV");
      cell.className = "col s1";
      row.appendChild(cell);
      board_state[y][x] = "";
      cell.innerHTML = board_state[y][x];
      cell.addEventListener("mousedown", (event) => {
        cellClicked(cell, x, y);
        event.stopPropagation();
      });
    }
  }
  gameRunning = true;
  changeActivePlayer();
}

function cellClicked(cell, x, y) {
  if (board_state[y][x] === "" && gameRunning) {
    board_state[y][x] = cell.innerHTML = symbols[activePlayer];
    if (checkWinCondition(x, y)) {
      alert("Player " + (activePlayer + 1) + " won!");
      clearInterval(timerInterval);
      gameRunning = false;
    } else {
      changeActivePlayer();
    }
  }
}

function changeActivePlayer() {
  clearInterval(timerInterval);
  time = TURN_TIMER;
  activePlayer = activePlayer === 1 ? 0 : 1;
  document.getElementById("active-player-indicator").innerHTML =
    symbols[activePlayer] + "'s turn.";
  timerInterval = setInterval(updateTimerBar, 100);
  function updateTimerBar() {
    const timerBar = document.getElementById("timer-bar");
    time--;
    timerBar.innerHTML = time / 10;
    timerBar.style.width = time * 2 + "px";
    if (time <= 0) {
      time = TURN_TIMER;
      changeActivePlayer();
    }
  }
}

function checkWinCondition(x, y) {
  let count = 0;
  //Check horizontal
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board_state[y][i] === symbols[activePlayer]) {
      count++;
      if (count >= WINNING_SCORE) {
        return true;
      }
    } else {
      break;
    }
  }
  count = 0;

  //Check vertical
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board_state[i][x] === symbols[activePlayer]) {
      count++;
      if (count >= WINNING_SCORE) {
        return true;
      }
    } else {
      break;
    }
  }
  count = 0;

  //Check / diagonal
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board_state[i][i] === symbols[activePlayer]) {
      count++;
      if (count >= WINNING_SCORE) {
        return true;
      }
    } else {
      break;
    }
  }
  count = 0;

  //Check \ diagonal
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board_state[BOARD_SIZE - i - 1][i] === symbols[activePlayer]) {
      count++;
      if (count >= WINNING_SCORE) {
        return true;
      }
    } else {
      break;
    }
  }

  return false;
}
