# fp-ts-implicit

```ts
import { monoid as M } from "fp-ts-implicit";
import assert from "assert";
import { pipe } from "fp-ts/function";
import { struct } from "fp-ts/Monoid";
import { MonoidSum } from "fp-ts/number";

const numTest = pipe(
  [1, 5, 10], 
  M.concatAll("product")
  //            ^--- inferred as "product" | "sum"
);
assert.deepStrictEqual(numTest, 50);

const boolTest = pipe(
  [true, true, false], 
  M.concatAll("all")
  //            ^--- inferred as "any" | "all"
);
assert.deepStrictEqual(boolTest, true);

/////////////////////////////////////////
// Use the implicit 'Monoid' typeclass //
/////////////////////////////////////////

export const concatFirstThree =
  <A>(m: M.GetInstances<A>) =>
  (a: A[]) =>
    ca(M.getInstance<A>(m))(a.slice(0, 3));

////////////////////////////////
// Register your own instance //
////////////////////////////////

interface Point { x: number; y: number }
const PointMonoid = struct<Point>({ x: MonoidSum, y: MonoidSum });

declare module "fp-ts-implicit/typeclasses/Monoid" {
  interface ExtractInstanceTypes<A> {
    Point: A extends Point ? Point : never;
  }
}

registerInstance("Point", PointMonoid);

///////////////////////////
// Use your own instance //
///////////////////////////

const point: Point = { x: 1, y: 1}
const pointTest = pipe(
  [point, point, point], 
  M.concatAll("Point")
  //            ^--- inferred as "Point"
);
assert.deepStrictEqual(pointTest, { x: 3, y: 3 });
```

## Pros:
- Less importing - `import * as M from 'Monad'` for _all_ maps & chains
- Instance inference - autocomplete tells you all of the options that will fill the current type
- Instances can extend - a Monad instance (`of` & `chain`) gives Applicative, Chain, Apply, Pointed, and Functor instances for free (without having to implement map, ap etc.)
  - could mean significantly less code in implementations
- Closer to Haskell style


## Cons:
- Users must register each custom instance manually
- More complicated function signatures
- No more parameterized instances (E.g. Record.Traversable(ord)) - will have to be static
- No jsdoc per instance