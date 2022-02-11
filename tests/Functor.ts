import assert from "assert";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import { functor as F } from "../src/index";

test("functor - map - Option", () => {
  const some = O.some(22);
  const a = pipe(
    some,
    F.map("Option", (a) => "Hello")
  );
  assert.deepStrictEqual(a, O.some("Hello"));
});

test("functor - map - Either", () => {
  const right = E.right<string, number>(22);
  const a = pipe(
    right,
    F.map("Either", (a) => a + 3)
  );
  assert.deepStrictEqual(a, E.right(25));
});
