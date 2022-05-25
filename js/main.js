'use strict';
const BOMB = '<i class="fa-solid fa-bomb"></i>';
const FLAG = '<i class="fa-solid fa-poop"></i>';
const EMPTY = '';
const SMILY = '<i class="fa-solid fa-face-glasses"></i>';
const WIN = '<i class="fa-solid fa-face-tongue-money"></i>';
const MINE = '<i class="fa-solid fa-face-smile-halo"></i>';

var gLives = '<3';
var gLivesCount = 2;
var bombCount = 2;
var gInterval;
var gBoard;
var gLevel = {
  size: 4,
};

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

var gTime = gGame.secsPassed * 60;

function initGame() {
  gBoard = creatMat(gLevel.size, gLevel.size);
  renderBoard(gBoard);
  console.table(gBoard);
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
    console.log(gBoard.mines);
  }
  strHtml += '</tbody></table>';
  //   elSmilyBtn.innerHTML = SMILY;
  //   elSpanOpenCells.innerHTML = strHtmlOpenCells;
  //   console.log(strHtml);
}

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
function creatCell() {
  var cell = {
    minesAroundCount: 0,
    isShown: true,
    isMine: true,
    isMarked: true,
  };
  return cell;
}

function cellClicked(elCell, idxI, idxJ) {
  console.log(gBoard[idxI][idxJ]);
}
