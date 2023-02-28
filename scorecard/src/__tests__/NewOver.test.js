import { NewOver } from "../App";

test("New Over when new innings", () => {
  const received = NewOver([]);
  expect(received).toBe(true);
});

test("Not new over in the middle of an over", () => {
  const received = NewOver([[1]]);
  expect(received).toBe(false);
});

test("New over after 6 balls", () => {
  const received = NewOver([[0, 0, 0, 0, 0, 0]]);
  expect(received).toBe(true);
});

test("Not new over after 6 balls with wide", () => {
  const received = NewOver([[0, 0, ["Wide", 1], 0, 0, 0]]);
  expect(received).toBe(false);
});

test("New over after 7 balls with wide", () => {
  const received = NewOver([[0, 0, 0, ["Wide", 1], 0, 0, 0]]);
  expect(received).toBe(true);
});

test("Not new over with wide at end of over", () => {
  const received = NewOver([[0, 0, 0, 0, 0, "Wide"]]);
  expect(received).toBe(false);
});
