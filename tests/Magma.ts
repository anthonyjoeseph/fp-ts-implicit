import assert from "assert";
import { pipe } from "fp-ts/function";
import { magma as Ma } from "../src/index";

test("number - Product", () => {
  const numTest = pipe([1, 5, 10], Ma.concatAll("Product", 1));
  assert.deepStrictEqual(numTest, 50);
});

test("number - Sum", () => {
  const numTest = pipe([1, 5, 10], Ma.concatAll("Sum", 0));
  assert.deepStrictEqual(numTest, 16);
});

test("string", () => {
  const stringTest = pipe(["a", "b", "c"], Ma.concatAll("String", ""));
  assert.deepStrictEqual(stringTest, "abc");
});

test("boolean - Any", () => {
  const boolTest = pipe([true, true, false], Ma.concatAll("Any", false));
  assert.deepStrictEqual(boolTest, true);
});

test("boolean - All", () => {
  const boolTest = pipe([true, true, false], Ma.concatAll("All", true));
  assert.deepStrictEqual(boolTest, false);
});
