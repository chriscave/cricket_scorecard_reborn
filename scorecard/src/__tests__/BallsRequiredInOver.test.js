import { BallsRequiredInOver } from "../App";

test("6 balls with no penalties", () => {
  const actual = BallsRequiredInOver([1, 2]);
  const expected = 6;
  expect(actual).toBe(expected);
});

test("7 balls with one wide", () => {
  const actual = BallsRequiredInOver(["Wide"]);
  const expected = 7;
  expect(actual).toBe(expected);
});
test("8 balls with two penalties", () => {
  const actual = BallsRequiredInOver(["Wide", "No ball"]);
  const expected = 8;
  expect(actual).toBe(expected);
});
