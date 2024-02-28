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

describe("Game Board Factory", () => {
  /* USING HELPER FUNCTION */
  let gameBoard;
  beforeEach(() => {
    /* CREATING A GAME BOARD */
    gameBoard = GameBoard();
    /* PLACING SHIPS */
    gameBoard.placeShip(3, 0, 1);
    gameBoard.placeShip(5, 3, 1);
    /* ATTACKING SHIPS */
    gameBoard.receiveAttack(0, 1);
    gameBoard.receiveAttack(0, 2);
    gameBoard.receiveAttack(3, 1);
    /* MISSING SHOT */
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(8, 6);
  });

  test("Place Ships", () => {
    /* SHIP 1 TEST */
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

  test("Check successful attack on a ship", () => {
    let shipList = gameBoard.getShipList();
    expect(shipList[0].getNoOfHits()).toBe(2);
    expect(shipList[1].getNoOfHits()).toBe(1);
  });

  test("Storing Missed Shots", () => {
    expect(gameBoard.getMissedAttacks()).toEqual([
      [0, 0],
      [8, 6],
    ]);
    gameBoard.receiveAttack(6, 6);
    expect(gameBoard.getMissedAttacks()).toEqual([
      [0, 0],
      [8, 6],
      [6, 6],
    ]);
  });

  test("All Ship Sunk", () => {
    expect(gameBoard.isAllShipSunk()).toBeFalsy();
    gameBoard.receiveAttack(0, 3);
    expect(gameBoard.isAllShipSunk()).toBeFalsy();
    gameBoard.receiveAttack(3, 2);
    gameBoard.receiveAttack(3, 3);
    gameBoard.receiveAttack(3, 4);
    expect(gameBoard.isAllShipSunk()).toBeFalsy();
    gameBoard.receiveAttack(3, 5);
    expect(gameBoard.isAllShipSunk()).toBeTruthy();
  });
});
