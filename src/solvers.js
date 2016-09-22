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

var allSolutions = function(n, chessPieces) {
  var emptyBoard;
  var solutions = [];

  var helper = function(n, row, col, board) {
    // toggle and add piece to row, col
    board.togglePiece(row, col);

    // if dealing with queens
    if (chessPieces === 'queens') {
      if (!board.hasAnyQueensConflicts()) {
        // check if solution
        // solution found if in last last row and no conflicts
        if (row === n - 1) {
          var matrix = _.map(board.rows(), function(row) { return row.slice(); });

          // add solution
          solutions.push(matrix);

        } else {
          // if valid move but not solution
          for (var colIndex = 0; colIndex < n; colIndex++) {
            // check if board will be out of bounds if you increase row by 1
            if (!board._isInBounds(row + 1, colIndex)) {
              return;
            }

            // find possible boards
            helper(n, row + 1, colIndex, board);
          }
        }
      }

    // if dealing with rooks
    } else if (chessPieces === 'rooks') {
      if (!board.hasAnyRooksConflicts()) {
        // check if solution
        // solution found if in last last row and no conflicts
        if (row === n - 1) {
          var matrix = _.map(board.rows(), function(row) { return row.slice(); });

          // add solution
          solutions.push(matrix);

        } else {
          // if valid move but not solution
          for (var colIndex = 0; colIndex < n; colIndex++) {
            // check if board will be out of bounds if you increase row by 1
            if (!board._isInBounds(row + 1, colIndex)) {
              return;
            }

            // find possible boards
            helper(n, row + 1, colIndex, board);
          }
        }
      }
    }
    // toggle and remove piece
    board.togglePiece(row, col);
  };

  for (var startingCol = 0; startingCol < n; startingCol++) {
    emptyBoard = new Board({'n': n});
    helper(n, 0, startingCol, emptyBoard);
  }

  return solutions;
};

window.findNRooksSolution = function(n) {
  var solution = allSolutions(n, 'rooks')[0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = allSolutions(n, 'rooks').length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  if (n === 0 || n === 2 || n === 3) {
    return board.rows();
  }

  var solution = allSolutions(n, 'queens')[0];
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }

  var solutionCount = allSolutions(n, 'queens').length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
