'use strict';

const WALL = '🧱';
const FOOD = '🍇';
const SUPERFOOD = '🍌';
const EMPTY = ' ';
const CHERRY = '🍒';

const gGame = {
  score: 0,
  isOn: false,
};
var gBoard;
let gIsAllFoodGon;
let gIsSuper;
let gCherryInterval;

function onInit() {
  // console.log('hello')
  gIsAllFoodGon = false;
  document.querySelector('.modal').style.display = 'none';
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);

  renderBoard(gBoard);
  gGame.isOn = true;
  gCherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPERFOOD;
  board[8][1] = SUPERFOOD;
  board[8][8] = SUPERFOOD;
  board[1][8] = SUPERFOOD;
  console.log('board:', board);
  return board;
}

function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  const elContainer = document.querySelector('.board');
  elContainer.innerHTML = strHTML;
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function updateScore(diff) {
  // update model and dom
  gGame.score += diff;
  document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
  let modal = document.querySelector('.modal');

  if (gIsAllFoodGon) {
    modal.querySelector('span').innerText = 'Victorious';
  } else {
    modal.querySelector('span').innerText = 'Game Over!!!';
  }
  console.log('Game Over');
  modal.style.display = 'block';
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gCherryInterval);
  renderCell(gPacman.location, EMPTY);
}

function addCherry() {
  let cellPos = getEmptyPos();
  let tempCell = gBoard[cellPos.i][cellPos.j];

  gBoard[cellPos.i][cellPos.j] = CHERRY;
  renderCell(cellPos, CHERRY);

  setTimeout(() => removeCherry(cellPos, tempCell), 3000);
}

function removeCherry(cherryPos, cellContent) {
  if (
    gBoard[cherryPos.i][cherryPos.j] === PACMAN ||
    gBoard[cherryPos.i][cherryPos.j] === GHOST
  )
    return;

  gBoard[cherryPos.i][cherryPos.j] = cellContent;
  renderCell(cherryPos, cellContent);
}

function getEmptyPos() {
  const emptyPoss = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] != WALL) {
        emptyPoss.push({ i, j }); // {i:1,j:3}
      }
    }
  }
  var randIdx = getRandomInt(0, emptyPoss.length);
  return emptyPoss[randIdx];
}
