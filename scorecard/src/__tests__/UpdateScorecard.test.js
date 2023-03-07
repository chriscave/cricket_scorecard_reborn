import { UpdateScorecard } from "../App";
import Ball from "../Ball";

test("Add Ball class to Scorecard", () => {
  const ball = new Ball(1);
  const received = UpdateScorecard(ball, []);
  const expected = [[ball]];
  expect(received).toStrictEqual(expected);
});

test("Add Ball to start new over", () => {
  const ball = new Ball(2);
  const expected = [
    [
      new Ball(1),
      new Ball(1),
      new Ball(1),
      new Ball(1),
      new Ball(1),
      new Ball(1),
    ],
  ];
  const received = UpdateScorecard(ball, expected);
  expected.push([ball]);
  expect(received).toStrictEqual(expected);
});

test("UpdateScorecard should not change the scorecard", () => {
  const scorecard = [[new Ball(1)]];
  const ball = new Ball(2);
  const received = UpdateScorecard(ball, scorecard);
  expect(received).not.toStrictEqual(scorecard);
});

test("Add Ball class to current over", () => {
  const expected = [new Ball(1), new Ball(0), new Ball(0)];
  const ball = new Ball(2);
  const received = UpdateScorecard(ball, [expected]);
  expected.push(ball);

  expect(received).toStrictEqual([expected]);
});

test("Add ball to current second over", () => {
  const expected = [
    [
      new Ball(0),
      new Ball(0),
      new Ball(0),
      new Ball(0),
      new Ball(0),
      new Ball(1),
    ],
    [new Ball(0), new Ball(0)],
  ];
  const ball = new Ball(2);
  const received = UpdateScorecard(ball, expected);
  expected[1].push(ball);
  expect(received).toStrictEqual(expected);
});

test("Add seventh Ball to over with wide", () => {
  const ball = new Ball(0);
  const expected = [
    new Ball(0),
    new Ball("Wide", 0),
    new Ball(0),
    new Ball(0),
    new Ball(0),
    new Ball(0),
  ];
  const received = UpdateScorecard(ball, [expected]);
  expected.push(ball);
  expect(received).toStrictEqual([expected]);
});
