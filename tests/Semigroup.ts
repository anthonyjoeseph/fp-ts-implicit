import assert from "assert";
import { pipe } from "fp-ts/function";
import { semigroup as S } from "../src/index";

test("number - product", () => {
  const numTest = pipe([1, 5, 10], S.concatAll("product", 1));
  assert.deepStrictEqual(numTest, 50);
});

test("number - sum", () => {
  const numTest = pipe([1, 5, 10], S.concatAll("sum", 0));
  assert.deepStrictEqual(numTest, 16);
});

test("string", () => {
  const stringTest = pipe(["a", "b", "c"], S.concatAll("string", ""));
  assert.deepStrictEqual(stringTest, "abc");
});

test("boolean - any", () => {
  const boolTest = pipe([true, true, false], S.concatAll("any", false));
  assert.deepStrictEqual(boolTest, true);
});

test("boolean - all", () => {
  const boolTest = pipe([true, true, false], S.concatAll("all", true));
  assert.deepStrictEqual(boolTest, false);
});
