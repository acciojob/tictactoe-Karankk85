const submitBtn = document.getElementById('submit');
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

let player1 = '';
let player2 = '';
let currentPlayer = 'X';
let gameActive = false;
let boardState = Array(9).fill('');

submitBtn.addEventListener('click', () => {
  player1 = document.getElementById('player1').value.trim() || 'Player 1';
  player2 = document.getElementById('player2').value.trim() || 'Player 2';

  document.getElementById('player-input').style.display = 'none';
  board.style.display = 'grid';
  message.textContent = `${player1}'s Turn (X)`;
  gameActive = true;
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');

    if (!gameActive || boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      message.textContent = `${currentPlayer === 'X' ? player1 : player2} wins! 🎉`;
      gameActive = false;
      return;
    }

    if (!boardState.includes('')) {
      message.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer === 'X' ? player1 : player2}'s Turn (${currentPlayer})`;
  });
});

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