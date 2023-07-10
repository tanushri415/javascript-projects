const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');

const startCells = ['', '', '', '', '', '', '', '', ''];

let go = 'circle';
infoDisplay.textContent = 'circle goes first';

function createBoard() {
  startCells.forEach((cel, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', addGo);
    gameBoard.append(cellElement);
  });
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement('div');
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === 'circle' ? 'cross' : 'circle';
  infoDisplay.textContent = 'it is now' + go + 's go.';
  e.target.removeEventListener('click', addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square');
  console.log(allSquares);
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains('circle')
    );

    if (circleWins) {
      infoDisplay.textContent = 'Circle Wins!';
      drawLine(array);
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }

    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains('cross')
    );
    if (crossWins) {
      infoDisplay.textContent = 'crossWins!';
      drawLine(array);
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }
  });
}

// function drawLine(array) {
//   drawHorizontalLine([0, 1, 2]);
// }

// function drawHorizontalLine(array) {
//   array.forEach((cel, index) => {
//     const cell = document.getElementById(array[index]);
//     const cellElement = document.createElement('div');
//     cellElement.classList.add('horizontalLine');
//     //   cellElement.id = index;
//     //   cellElement.addEventListener('click', addGo);
//     cell.append(cellElement);
//   });
// }

// function drawVerticalLine(array) {}

// function drawDiagonalLine(array) {}
