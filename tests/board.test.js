import { createBoard, filterBoard } from "../src/board";

test("Create Board", () => {
  expect(createBoard(2, 2)).toEqual([
    [null, null],
    [null, null],
  ]);
});

test("Filter Board", () => {
  const board = [
    [0, 0, 1, 1],
    [2, null, null, null],
    [null, null, 3, 0],
    [4, 0, 0, 0],
  ];
  const actual = filterBoard(board);
  const expected = [
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 1],
    [2, 2],
    [3, 0],
  ];
  expect(actual).toEqual(expected);
});
