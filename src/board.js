function createBoard(rows, cols) {
  const t1 = [];
  for (let i = 0; i < rows; i++) {
    const t2 = [];
    for (let j = 0; j < cols; j++) {
      t2.push(null);
    }
    t1.push(t2);
  }
  return t1;
}

function filterBoard(board) {
  const temp = [];
  const rows = board.length;
  const cols = board[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] != 0) {
        temp.push([i, j]);
      }
    }
  }
  return temp;
}

export { createBoard, filterBoard };
