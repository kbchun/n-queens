/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  debugger;
  var board = new Board({'n': n});
  var solutions = filterPossibilities(getFinalBoards(n, 0, board));

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions[0].rows();
};

var getFinalBoards = function(n, row, board) {
  var boards = [];
  // var solutions = [];

  if (board._isInBounds(row, 0)) {
    for (var i = 0; i < n; i++) {
      // var copy = new Board(board.rows());
      var copyMatrix = [];
      for (var j = 0; j < board.rows().length; j++) {
        copyMatrix.push(board.rows()[j].slice());
      }
      var copy = new Board(copyMatrix);
      copy.togglePiece(row, i);
      // boards.push(copy);
      boards.push(getFinalBoards(n, row + 1, copy));
    }
  } else {
    // console.log(board);
    return board;
  }

  return boards;
};


var filterPossibilities = function(boards) {
  var solutions = [];
  boards = _.flatten(boards);
  for (var j = 0; j < boards.length; j++) {
    // for (var k = 0; k < boards[j].length; k++) {
    if (!boards[j].hasAnyRooksConflicts()) {
      solutions.push(boards[j]);
    }
  }
  return solutions;
};

// var x = new Board({n:2});
// debugger; 
// var y = getFinalBoards(2, 0, x);

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  var board = new Board({'n': n});
  var solutions = filterPossibilities(getFinalBoards(n, 0, board));

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
