import { getParts } from "../Ball";

test("evenFactor even", () => {
  expect(getParts(2)).toStrictEqual([2]);
});

test("getParts odd", () => {
  expect(getParts(3)).toStrictEqual([2, 1]);
});

test("getParts", () => {
  const n = 10;
  getParts(n);
  expect(n).toBe(10);
});
