import { Ship } from "../src/factories";

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
