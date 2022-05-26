'use strict';
const BOMB = '<i class="fa-solid fa-bomb"></i>';
const FLAG = '🚩';
const EMPTY = '';
const SMILY = '😁';
const WIN = '😎';
const MINE = '💣';

var elSpanOpenCells = document.querySelector('.open-cells');
var elSpanMarked = document.querySelector('.flags');
var elSpanLives = document.querySelector('.lives');
var elSpanTimer = document.querySelector('.time');
var elSmilyBtn = document.querySelector('.smily');

var gLives = '❤️';
var gLivesCount = 2;
var gBombCount = 2;
var gBoard;
var gInterval;

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

var gTime = gGame.secsPassed * 60;

var gLevel = {
  size: 4,
};

function initGame() {
  gBoard = creatMat(gLevel.size, gLevel.size);
  renderBoard(gBoard);
  // console.table(gBoard);
}

function renderBoard(mat) {
  var strHtml = '<table><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHtml += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var innerCell = mat[i][j].isMine ? BOMB : '';
      strHtml += `<td class="cell" oncontextmenu="putFlag(this, event, ${i}, ${j})"
        onclick="cellClicked(this, ${i}, ${j})"><span class="cell${i}-${j}">${innerCell}</span></td> `;
    }
    strHtml += '</tr>';
    var elContainer = document.querySelector('.game-container');
    elContainer.innerHTML = strHtml;
    // console.log(gBoard.mines);
  }
  strHtml += '</tbody></table>';
  elSmilyBtn.innerHTML = SMILY;

  var strHtmlOpenCells = `<h2>open cells - 0</h2>`;
  elSpanOpenCells.innerHTML = strHtmlOpenCells;

  var strHtmlFlagCount = `<h2>flags placed - 0</h2>`;
  elSpanMarked.innerHTML = strHtmlFlagCount;

  var strHtmlLives = `<h2>lives left - ${gLives.repeat(gLivesCount)}</h2>`;
  elSpanLives.innerHTML = strHtmlLives;

  var strHtmlTime = `<h2>0:00</h2>`;
  elSpanTimer.innerHTML = strHtmlTime;

  // elSpanOpenCells.innerHTML = strHtmlOpenCells;
}

// console.log(strHtml);

// function buildBoard(){}
function creatMat(rows, cols) {
  var mat = [];
  for (var i = 0; i < rows; i++) {
    mat[i] = [];
    for (var j = 0; j < cols; j++) {
      mat[i][j] = creatCell();
    }
  }
  return mat;
  console.log(mat);
}

function placeBombs(mat, count) {
  for (var i = 0; i < count; i++) {
    var idxI = getRandomInt(0, mat.length);
    var idxJ = getRandomInt(0, mat.length);
    mat[idxI][idxJ].isMine = true;
    console.log(mat, count);
  }
}

function creatCell() {
  var cell = {
    minesAroundCount: 0,
    isShown: true,
    isMine: true,
    isMarked: true,
  };
  return cell;
}

function setDificultyLevel(elBtn) {
  var data = elBtn.getAttribute('data-level');
  gLevel.size = +data;
  switch (+data) {
    case 4:
      gLevel.mines = 2;
      gLivesCount = 2;
      break;
    case 8:
      gLevel.mines = 12;
      gLivesCount = 3;
      break;
    case 12:
      gLevel.mines = 30;
      gLivesCount = 3;
      break;
  }
  initGame();
}

function cellClicked(elBtn, idxI, idxJ) {
  if (gGame.shownCount === 0) gInterval = setInterval(timePassed, 1000);
  if (elBtn.classList.contains('clicked')) return;
  console.log(gBoard, gBoard[idxI][idxJ]);

  gGame.isOn = true;
  gBoard[idxI][idxJ].isShown = true;

  gGame.shownCount++;

  var strHtmlOpenCells = `<h2>open cells - ${gGame.shownCount}</h2>`;
  elSpanOpenCells.innerHTML = strHtmlOpenCells;

  var elCell = document.querySelector(`.cell${idxI}-${idxJ}`);
  elCell.style.visibility = 'visibility';
  elBtn.classList.add('clicked');

  gBombCount = setMinesNegsCount(gBoard, idxI.idxJ);
  gBoard[idxI][idxJ].minesAroundCount = gBombCount;

  if (!gBoard[idxI][idxJ].isMine) elBtn.innerText = gBombCount;

  if (gBoard[idxI][idxJ].isMine) {
    elSmilyBtn.innerHTML = MINE;
    gLivesCount--;
  }
  LivesCount(gLivesCount);
  if (
    gLivesCount > 0 &&
    gGame.shownCount === gLevel.size * gLevel.size - gLevel.mines
  ) {
    clearInterval(gInterval);
    elSmilyBtn.innerHTML = WIN;
    gGame.isOn = false;
    gameOver();
  }
  if (gLivesCount === 0) {
    clearInterval(gInterval);
    gameOver();
  }
}

function putFlag(elBtn, ev, idxI, idxJ) {
  ev.preventDefault();
  if (elBtn.innerText !== FLAG) {
    elBtn.innerText = FLAG;
    gGame.markedCount++;
  } else {
    elBtn.innerHTML = `<td class="cell" oncontextmenu="putFlag(this,event)" onclick="cellClicked(this, ${idxI},${idxJ})"><span class="cell${idxI}-${idxJ}"></span></td>`;
    gGame.markedCount--;
  }
  var strHtmlFlagCount = `<h2>flags placed - ${gGame.markedCount}</h2>`;
  elSpanMarked.innerHTML = strHtmlFlagCount;
}

function setMinesNegsCount(mat, cellI, cellJ) {
  var NeighborBombs = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j >= cellJ + 1; j++) {
      if (j < 0 || j >= mat[0].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (mat[i][j].isMine) NeighborBombs++;
    }
  }
  return NeighborBombs;
}
function restart() {
  gLevel.size = 4;
  gBombCount = 0;
  gLivesCount = 2;
  gGame.markedCount = 0;
  gGame.shownCount = 0;
  var elScreen = document.querySelector('.game-over-screen');
  elScreen.style.display = 'none';
  initGame();
}

function LivesCount(lives) {
  var strHtmlLives = `<h2>lives left - ${gLives.repeat(lives)}</h2>`;
  elSpanLives.innerHTML = strHtmlLives;
}

function setMinesNegsCount(mat, cellI, cellJ) {
  var NeighborBombs = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[0].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (mat[i][j].isMine) NeighborBombs++;
    }
  }
  return NeighborBombs;
}

function putFlag(elBtn, ev, idxI, idxJ) {
  ev.preventDefault();

  if (elBtn.innerText !== FLAG) {
    elBtn.innerText = FLAG;
    gGame.markedCount++;
  } else {
    elBtn.innerHTML = `<td class="cell" oncontextmenu="putFlag(this, event)" onclick="cellClicked(this, ${idxI}, ${idxJ})"><span class="cell${idxI}-${idxJ}"></span></td> `;
    gGame.markedCount--;
  }
  var strHtmlFlagCount = `<h2>flags placed - ${gGame.markedCount}</h2>`;
  elSpanMarked.innerHTML = strHtmlFlagCount;
}

function gameOver() {
  var elScreen = document.querySelector('.game-over-screen');
  elScreen.style.display = 'block';
  var elWinLoseDiv = document.querySelector('.win-lose');
  var strHtmlWin = `<h2>you are victorious</h2>`;
  var strHtmllose = `<h2>game over</h2>`;
  elWinLoseDiv.innerHTML = gLivesCount === 0 ? strHtmllose : strHtmlWin;
}

function timePassed() {
  var min = Math.floor(gTime / 60);
  var sec = gTime % 60;
  sec = sec < 10 ? '0' + sec : sec;
  gTime++;
  var strHtml = `<h2>${min}:${sec}</h2>`;
  elSpanTimer.innerHTML = strHtml;
}
