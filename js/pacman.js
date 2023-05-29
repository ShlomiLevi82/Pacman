'use strict';

const PACMAN = '😀';

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 7,
      j: 7,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function onMovePacman(ev) {
  if (!gGame.isOn) return;

  const nextLocation = getNextLocation(ev);
  //   console.log('nextLocation:', nextLocation);
  if (!nextLocation) return;

  const nextCell = gBoard[nextLocation.i][nextLocation.j];
  //   console.log('nextCell:', nextCell);
  // return if cannot move
  if (nextCell === WALL) return;
  // hitting a ghost? call gameOver
  if (nextCell === GHOST && gGhosts.isSuper) {
    gameOver();
    return;
  }
  if (nextCell === FOOD) {
    updateScore(1);
  } else if (nextCell === CHERRY) {
    updateScore(10);
  } else if (nextCell === SUPERFOOD) {
    gPacman.isSuper = true;
    gIsSuper = true;

    //change ghosts emoji
    changeGhostEmoji();

    console.log('gIsSuper', gIsSuper);
    setTimeout(notSuper, 5000);
  }
  // moving from current location:
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);

  // Move the pacman to new location:
  // update the model
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the DOM
  renderCell(gPacman.location, PACMAN);

  gIsAllFoodGon = checkForEmptyCell();
  if (gIsAllFoodGon) {
    gameOver();
  }
  //   console.log('gIsAllFoodGon', gIsAllFoodGon);
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // console.log('eventKeyboard.code:', eventKeyboard.code)

  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    default:
      return null;
  }

  return nextLocation;
}

function checkForEmptyCell() {
  let row = [];
  for (var i = 0; i < gBoard.length; i++) {
    row = gBoard[i];
    if (row.includes(FOOD)) {
      return false;
    }
  }

  return true;
}

function notSuper() {
  gPacman.isSuper = false;
  gIsSuper = false;
  changeGhostEmoji();
  console.log('gIsSuper', gIsSuper);
}
