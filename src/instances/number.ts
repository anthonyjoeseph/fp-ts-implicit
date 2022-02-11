import * as N from "fp-ts/number";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes {
    Sum: number;
    Product: number;
  }
}

registerInstance("Sum", N.MonoidSum);
registerInstance("Product", N.MonoidProduct);
