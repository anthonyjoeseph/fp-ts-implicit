import assert from "assert";
import { pipe } from "fp-ts/function";
import { semigroup as S } from "../src/index";

test("number - Product", () => {
  const numTest = pipe([1, 5, 10], S.concatAll("Product", 1));
  assert.deepStrictEqual(numTest, 50);
});

test("number - Sum", () => {
  const numTest = pipe([1, 5, 10], S.concatAll("Sum", 0));
  assert.deepStrictEqual(numTest, 16);
});

test("String", () => {
  const stringTest = pipe(["a", "b", "c"], S.concatAll("String", ""));
  assert.deepStrictEqual(stringTest, "abc");
});

test("boolean - Any", () => {
  const boolTest = pipe([true, true, false], S.concatAll("Any", false));
  assert.deepStrictEqual(boolTest, true);
});

test("boolean - All", () => {
  const boolTest = pipe([true, true, false], S.concatAll("All", true));
  assert.deepStrictEqual(boolTest, false);
});
