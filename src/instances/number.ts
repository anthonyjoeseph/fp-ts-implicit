import * as N from "fp-ts/number";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes<A> {
    Sum: A extends number ? number : never;
    Product: A extends number ? number : never;
  }
}

registerInstance("Sum", N.MonoidSum);
registerInstance("Product", N.MonoidProduct);
