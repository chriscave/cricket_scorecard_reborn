import Ball from "../Ball";

test("Ball of a single run has one run, a symbol of one, no penalities", () => {
  const ball = new Ball(1);
  expect(ball.runs).toBe(1);
  expect(ball.symbol).toBe(1);
  expect(ball.penalty).toBe(0);
});

test("Ball of a single run has two run, a symbol of two, no penalities", () => {
  const ball = new Ball(2);
  expect(ball.runs).toBe(2);
  expect(ball.symbol).toBe(2);
  expect(ball.penalty).toBe(0);
});

test("Wicket has 0 runs and a symbol of W and no penalities", () => {
  const ball = new Ball("Wkt");
  expect(ball.runs).toBe(0);
  expect(ball.symbol).toBe("W");
  expect(ball.penalty).toBe(0);
});

test("Wide has 1 run and a symbol of wd and 1 penalty", () => {
  const ball = new Ball("Wide");
  expect(ball.runs).toBe(1);
  expect(ball.symbol).toBe("wd");
  expect(ball.penalty).toBe(1);
});
