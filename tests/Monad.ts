import * as assert from "assert";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as M from "../src/typeclasses/Monad";

test("monad - chain - Option", () => {
  const some = O.some(22);
  const a = pipe(
    some,
    M.chain("Option", (a) => O.some("hello"))
  );
  assert.deepStrictEqual(a, O.some("hello"));
});

test("monad - chain - Either", () => {
  const right = E.right<string, number>(22);
  const a = pipe(
    right,
    M.chain("Either", (a) => E.right(a + 3))
  );
  assert.deepStrictEqual(a, E.right(25));
});
