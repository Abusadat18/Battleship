function Ship(length) {
  let noOfHits = 0;

  function hit() {
    noOfHits++;
  }

  function getNoOfHits() {
    return noOfHits;
  }

  function isSunk() {
    return noOfHits === length ? true : false;
  }

  return {
    length,
    getNoOfHits,
    hit,
    isSunk,
  };
}

function GameBoard() {
  const Board = createBoard(10, 10);
  let index = 0;
  const shipList = [];

  function placeShip(length, x, y) {
    const ship = Ship(length);
    for (let i = 0; i < length; i++) {
      Board[x][y + i] = index;
    }
    index++;
    shipList.push(ship);
  }

  function getBoard() {
    return Board;
  }

  return { placeShip, getBoard };
}

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

export { Ship, GameBoard, createBoard };
