// 'use strict';

// // location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//   // Select the elCell and set the value
//   var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
//   elCell.innerHTML = value;
// }

// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// function findEmptyCell() {
//   var emptyCells = [];
//   for (var i = 0; i < gBoard.length; i++) {
//     var currRow = gBoard[i];
//     for (var j = 0; j < currRow.length; j++) {
//       var cell = currRow[j];
//       if (cell === ' ') emptyCells.push({ i, j });
//     }
//   }
//   return emptyCells;
// }

// function shuffle(items) {
//   var randIdx;
//   var keep;
//   var i;
//   for (i = items.length - 1; i > 0; i--) {
//     randIdx = getRandomInt(0, items.length - 1);
//     keep = items[i];
//     items[i] = items[randIdx];
//     items[randIdx] = keep;
//   }
//   return items;
// }

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// function drawEmptyCell(emptyCells) {
//   return emptyCells.pop();
// }
