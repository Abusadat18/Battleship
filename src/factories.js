import { createBoard, filterBoard as getValidAttackPts } from "./board";

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
    Board[x][y] = 0;
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

function Player(name, opponentBoard) {
  function canAttack(x, y) {
    if (opponentBoard.getBoard()[x][y] === 0) {
      return false;
    }
    return true;
  }

  return { name, canAttack };
}

function Bot(opponentBoard) {
  function attack() {
    const filterBoard = getValidAttackPts(opponentBoard.getBoard());
    const randomShot = Math.floor(Math.random() * filterBoard.length);
    return filterBoard[randomShot];
  }
  return { attack };
}

export { Ship, GameBoard, Player };
