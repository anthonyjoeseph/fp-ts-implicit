import assert from "assert";
import { pipe } from "fp-ts/function";
import { monoid as M } from "../src/index";

test("number - Product", () => {
  const numTest = pipe([1, 5, 10], M.concatAll("Product"));
  assert.deepStrictEqual(numTest, 50);
});

test("number - Sum", () => {
  const numTest = pipe([1, 5, 10], M.concatAll("Sum"));
  assert.deepStrictEqual(numTest, 16);
});

test("String", () => {
  const stringTest = pipe(["a", "b", "c"], M.concatAll("String"));
  assert.deepStrictEqual(stringTest, "abc");
});

test("boolean - Any", () => {
  const boolTest = pipe([true, true, false], M.concatAll("Any"));
  assert.deepStrictEqual(boolTest, true);
});

test("boolean - All", () => {
  const boolTest = pipe([true, true, false], M.concatAll("All"));
  assert.deepStrictEqual(boolTest, false);
});
