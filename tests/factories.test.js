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
    0,
    0,
    0,
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
    1,
    1,
    1,
    1,
    1,
    null,
    null,
    null,
    null,
  ]);
});
