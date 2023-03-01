import { ConvertDetailIntoRuns } from "../BowlerDetails";

test("convert ball detail into runs", () => {
  const actual = ConvertDetailIntoRuns(3);
  const expected = 3;
  expect(actual).toBe(expected);
});

test("convert wicket to 0", () => {
  const actual = ConvertDetailIntoRuns("Wkt");
  const expected = 0;
  expect(actual).toBe(expected);
});

test("convert wide to 1", () => {
  const actual = ConvertDetailIntoRuns(["Wide", 2]);
  const expected = 3;
  expect(actual).toBe(expected);
});

// test("convert no ball to 1", () => {
//   const actual = ConvertDetailIntoRuns("No ball");
//   const expected = 1;
//   expect(actual).toBe(expected);
// });
