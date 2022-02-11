import * as S from "fp-ts/string";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes {
    String: string;
  }
}

registerInstance("String", S.Monoid);
