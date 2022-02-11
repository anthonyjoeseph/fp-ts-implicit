import * as B from "fp-ts/boolean";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes<A> {
    all: A extends boolean ? boolean : never;
    any: A extends boolean ? boolean : never;
  }
}

registerInstance("all", B.MonoidAll);
registerInstance("any", B.MonoidAny);
