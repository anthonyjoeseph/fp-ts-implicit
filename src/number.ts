import * as N from "fp-ts/number";
import { registerInstance } from "./Monoid";

declare module "./Monoid" {
  interface ExtractInstances<A> {
    sum: A extends number ? number : never;
    product: A extends number ? number : never;
  }
}

registerInstance("sum", N.MonoidSum);
registerInstance("product", N.MonoidProduct);

export const one = 1;
