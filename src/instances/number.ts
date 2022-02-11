import * as N from "fp-ts/number";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes<A> {
    sum: A extends number ? number : never;
    product: A extends number ? number : never;
  }
}

registerInstance("sum", N.MonoidSum);
registerInstance("product", N.MonoidProduct);
