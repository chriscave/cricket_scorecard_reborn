import { UpdateScorecard } from "../App";
test("Add ball when new innings", () => {
  const received = UpdateScorecard(1, []);
  const expected = [[1]];
  expect(received).toStrictEqual(expected);
});

test("Add ball to current over", () => {
  const received = UpdateScorecard(2, [[1, 0, 1]]);
  const expected = [[1, 0, 1, 2]];
  expect(received).toStrictEqual(expected);
});

test("Add ball to current second over", () => {
  const received = UpdateScorecard(2, [
    [0, 0, 0, 0, 0, 1],
    [0, 0],
  ]);
  const expected = [
    [0, 0, 0, 0, 0, 1],
    [0, 0, 2],
  ];
  expect(received).toStrictEqual(expected);
});

test("Add ball to start new over", () => {
  const received = UpdateScorecard(2, [[0, 0, 0, 0, 0, 0]]);
  const expected = [[0, 0, 0, 0, 0, 0], [2]];
  expect(received).toStrictEqual(expected);
});

test("Add ball to over with wide", () => {
  const received = UpdateScorecard(1, [[0, ["Wide", 0], 0, 0, 0, 0]]);
  const expected = [[0, ["Wide", 0], 0, 0, 0, 0, 1]];
  expect(received).toStrictEqual(expected);
});

test("Next input after wide is swallowed by previous ball", () => {
  const received = UpdateScorecard(1, [[0, "Wide"]]);
  const expected = [[0, ["Wide", 1]]];
  expect(received).toStrictEqual(expected);
});

// test("Add ball to new over", () => {
//   const received = UpdateScorecard(3, [[1, 0, 0, 0, 0, 0]]);
//   const expected = [[1, 0, 0, 0, 0, 0], [3]];
//   expect(received).toStrictEqual(expected);
// });
