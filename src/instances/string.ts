import * as S from "fp-ts/string";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes<A> {
    String: A extends string ? string : never;
  }
}

registerInstance("String", S.Monoid);
