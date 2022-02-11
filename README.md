# fp-ts-implicit

```ts
import { monoid as M, semigroup as S } from "fp-ts-implicit";
import assert from "assert";
import { pipe } from "fp-ts/function";
import { struct, concatAll } from "fp-ts/Monoid";
import { MonoidSum } from "fp-ts/number";

const numTest = pipe(
  [1, 5, 10], 
  M.concatAll("Product")
  //            ^--- inferred as "Product" | "Sum"
);
assert.deepStrictEqual(numTest, 50);

const boolTest = pipe(
  [true, true, false], 
  M.concatAll("All")
  //            ^--- inferred as "Any" | "All"
);
assert.deepStrictEqual(boolTest, true);

/////////////////////////////////////////
// Use the implicit 'Monoid' typeclass //
/////////////////////////////////////////

export const concatFirstThree =
  <A>(m: M.GetInstances<A>) =>
  (a: A[]): A => {
    const monoid = M.getInstance<A>(m);
    return a.slice(0, 3).reduce(monoid.concat, monoid.empty);
  }

////////////////////////////////
// Register your own instance //
////////////////////////////////

interface Point { x: number; y: number }
const PointMonoid = struct<Point>({ x: MonoidSum, y: MonoidSum });

declare module "fp-ts-implicit/typeclasses/Monoid" {
  interface ExtractInstanceTypes {
    Point: Point;
  }
}

M.registerInstance("Point", PointMonoid);

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


// We get a 'semigroup' instance as well, for free
const semigroupTest = pipe(
  [point, point, point], 
  S.concatAll("Point", { x: 9, y: 9 })
  //            ^--- inferred as "Point"
);
assert.deepStrictEqual(semigroupTest, { x: 12, y: 12 });
```

## Pros:
- Less importing - `import * as M from 'Monad'` for _all_ maps & chains
- Instance inference - autocomplete tells you all of the options that will fill the current type
- [Typeclasses can extend](https://github.com/anthonyjoeseph/fp-ts-implicit/blob/main/src/typeclasses/Functor.ts#L6) - a Monad instance (`of` & `chain`) gives Applicative, Chain, Apply, Pointed, and Functor instances for free ([without having to implement map, ap etc.](https://github.com/anthonyjoeseph/fp-ts-implicit/blob/main/src/typeclasses/Functor.ts#L33))
  - could mean significantly less code in implementations
- Closer to Haskell style


## Cons:
- Users must register each custom instance manually
- More complicated function signatures
- No more parameterized instances (E.g. [Record.getTraversable(ord)](https://github.com/gcanti/fp-ts/blob/master/src/ReadonlyRecord.ts#L1948)) - will have to be static
- No jsdoc per instance
- files declaring custom instances have to be imported somewhere, or else they're ignored at runtime