import { ConvertBallToSymbol } from "../Over";

test("does not convert number", () => {
  const actual = ConvertBallToSymbol(1);
  const expected = 1;
  expect(actual).toBe(expected);
});

test("Wicket is converted to W", () => {
  const actual = ConvertBallToSymbol("Wkt");
  const expected = "W";
  expect(actual).toBe(expected);
});

test("Wide is converted to wd", () => {
  const actual = ConvertBallToSymbol("Wide");
  const expected = "wd";
  expect(actual).toBe(expected);
});

test("Wide is converted to wd", () => {
  const actual = ConvertBallToSymbol(["Wide", 1]);
  const expected = "wd-1";
  expect(actual).toBe(expected);
});

test("No ball is converted to nb", () => {
  const actual = ConvertBallToSymbol("No ball");
  const expected = "nb";
  expect(actual).toBe(expected);
});
