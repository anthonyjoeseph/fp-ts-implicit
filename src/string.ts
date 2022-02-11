import * as M from "fp-ts/Monoid";
import * as S from "fp-ts/string";
import { registerInstance } from "./Monoid";

declare module "./Monoid" {
  interface ExtractInstances<A> {
    string: A extends string ? string : never;
  }
}

registerInstance("string", S.Monoid);
