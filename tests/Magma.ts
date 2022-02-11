import assert from "assert";
import { pipe } from "fp-ts/function";
import { magma as Ma } from "../src/index";

test("number - product", () => {
  const numTest = pipe([1, 5, 10], Ma.concatAll("product", 1));
  assert.deepStrictEqual(numTest, 50);
});

test("number - sum", () => {
  const numTest = pipe([1, 5, 10], Ma.concatAll("sum", 0));
  assert.deepStrictEqual(numTest, 16);
});

test("string", () => {
  const stringTest = pipe(["a", "b", "c"], Ma.concatAll("string", ""));
  assert.deepStrictEqual(stringTest, "abc");
});

test("boolean - any", () => {
  const boolTest = pipe([true, true, false], Ma.concatAll("any", false));
  assert.deepStrictEqual(boolTest, true);
});

test("boolean - all", () => {
  const boolTest = pipe([true, true, false], Ma.concatAll("all", true));
  assert.deepStrictEqual(boolTest, false);
});
