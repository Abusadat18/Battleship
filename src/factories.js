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

  function getBoard() {
    return Board;
  }

  let index = 1;
  const shipList = [];
  const missedAttacks = [];

  function placeShip(length, x, y) {
    const ship = Ship(length);
    for (let i = 0; i < length; i++) {
      Board[x][y + i] = index;
    }
    index++;
    shipList.push(ship);
  }

  function receiveAttack(x, y) {
    const attackPt = Board[x][y];
    if (attackPt) {
      shipList[attackPt - 1].hit(); /* Since Index Is 1 based [See Line 31] */
    } else {
      missedAttacks.push([x, y]);
    }
  }

  function getMissedAttacks() {
    return missedAttacks;
  }

  function getShipList() {
    return shipList;
  }

  function isAllShipSunk() {
    for (let ship of shipList) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  return {
    placeShip,
    getBoard,
    receiveAttack,
    getShipList,
    getMissedAttacks,
    isAllShipSunk,
  };
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
