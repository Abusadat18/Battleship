import { GameBoard, Ship, createBoard } from "../src/factories";

test("Ship Factory", () => {
  let destroyer = Ship(3);
  destroyer.hit();
  destroyer.hit();
  expect(destroyer.getNoOfHits()).toBe(2);
  expect(destroyer.isSunk()).toBeFalsy();

  destroyer.hit();
  expect(destroyer.getNoOfHits()).toBe(3);
  expect(destroyer.isSunk()).toBeTruthy();
});

test("Create Board", () => {
  expect(createBoard(2, 2)).toEqual([
    [null, null],
    [null, null],
  ]);
});

test("Place Ships", () => {
  const gameBoard = GameBoard();
  /* SHIP 1 TEST */
  gameBoard.placeShip(3, 0, 1);
  expect(gameBoard.getBoard()[0]).toEqual([
    null,
    1,
    1,
    1,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  /* SHIP 2 TEST */
  gameBoard.placeShip(5, 3, 1);
  expect(gameBoard.getBoard()[3]).toEqual([
    null,
    2,
    2,
    2,
    2,
    2,
    null,
    null,
    null,
    null,
  ]);
});

test("Receive Attack", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip(3, 0, 1);
  gameBoard.placeShip(5, 3, 1);
  /* HITTING A SHIP */
  expect(gameBoard.receiveAttack(0, 1)).toBe(1);
  expect(gameBoard.receiveAttack(0, 2)).toBe(1);
  expect(gameBoard.receiveAttack(3, 1)).toBe(2);

  /* MISSING SHOT */
  expect(gameBoard.receiveAttack(0, 0)).toBe(null);
  expect(gameBoard.receiveAttack(8, 6)).toBe(null);
});

test("Attack Hitting A Ship", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip(3, 0, 1);
  gameBoard.placeShip(5, 3, 1);
  gameBoard.receiveAttack(0, 1);
  gameBoard.receiveAttack(0, 2);
  gameBoard.receiveAttack(0, 3);
  gameBoard.receiveAttack(3, 2);

  let shipList = gameBoard.getShipList();
  expect(shipList[0].getNoOfHits()).toBe(3);
  expect(shipList[1].getNoOfHits()).toBe(1);
});

test("Storing Missed Shots", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip(3, 0, 1);
  gameBoard.placeShip(5, 3, 1);
  gameBoard.receiveAttack(0, 0);
  gameBoard.receiveAttack(8, 7);
  expect(gameBoard.getMissedAttacks()).toEqual([
    [0, 0],
    [8, 7],
  ]);
  gameBoard.receiveAttack(6, 6);
  expect(gameBoard.getMissedAttacks()).toEqual([
    [0, 0],
    [8, 7],
    [6, 6],
  ]);
});
