import assert from "assert";
import { pipe } from "fp-ts/function";
import { monoid as M } from "../src/index";

test("number - product", () => {
  const numTest = pipe([1, 5, 10], M.concatAll("product"));
  assert.deepStrictEqual(numTest, 50);
});

test("number - sum", () => {
  const numTest = pipe([1, 5, 10], M.concatAll("sum"));
  assert.deepStrictEqual(numTest, 16);
});

test("string", () => {
  const stringTest = pipe(["a", "b", "c"], M.concatAll("string"));
  assert.deepStrictEqual(stringTest, "abc");
});

test("boolean - any", () => {
  const boolTest = pipe([true, true, false], M.concatAll("any"));
  assert.deepStrictEqual(boolTest, true);
});

test("boolean - all", () => {
  const boolTest = pipe([true, true, false], M.concatAll("any"));
  assert.deepStrictEqual(boolTest, false);
});
