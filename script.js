let currentPlayer = "X";
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const cell = e.target;

  if (cell.textContent !== "" || checkWin()) return;

  cell.textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `${currentPlayer === "X" ? "jaindiv" : "player"}, congratulations you won!`;
  } else if (isDraw()) {
    message.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      // 🔥 Highlight winning cells
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return true;
    }
  }
  return false;
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}
