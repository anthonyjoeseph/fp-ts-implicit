import * as S from "fp-ts/string";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes<A> {
    string: A extends string ? string : never;
  }
}

registerInstance("string", S.Monoid);
